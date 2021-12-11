import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { validateUserRegistrationData } from "../../../lib/apiDataValidation";
import User from "../../../models/User";
import dbConnect from "../../../lib/mongodb";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { value, error } = validateUserRegistrationData(req.body);
        if (error) {
          return res
            .status(400)
            .json({ success: false, data: error.details[0].message });
        }

        const { emailId, password, firstName, lastName } = req.body;
        const userExists = await User.findOne({
          emailId,
        });
        if (userExists) {
          return res.status(403).json({
            success: false,
            data: "User already exists, please login",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          emailId,
          password: hashedPassword,
          firstName,
          lastName,
        });
        const savedUser = await newUser.save();

        const userJWTToken = jwt.sign(
          {
            userId: savedUser._id,
          },
          process.env.JWT_SECRET
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("authToken", userJWTToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
            path: "/",
            secure: process.env.NODE_ENV !== "development",
          })
        );
        res.status(200).json({
          success: true,
          data: { userId: savedUser._id, emailId, firstName, lastName },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Something went wrong, please try again later",
        });
      }
      break;
    default:
      res.status(400).json({ success: false, data: "Invalid HTTP method" });
  }
};

export default handler;
