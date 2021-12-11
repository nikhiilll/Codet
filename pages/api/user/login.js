import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { validateUserLoginData } from "../../../lib/apiDataValidation";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

const handler = async (req, res) => {
  const { method } = req;

  // Switch the different methods
  switch (method) {
    case "POST":
      try {
        if (!req.body.emailId || !req.body.password) {
          return res
            .status(400)
            .json({ success: false, data: "E-mail Id or password is invalid" });
        }

        const { value, error } = validateUserLoginData(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            data: error.details[0].message,
          });
        }

        const { emailId, password } = req.body;

        await dbConnect();

        const userExists = await User.findOne({
          emailId,
        });
        if (!userExists) {
          return res
            .status(401)
            .json({ success: false, data: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          userExists.password
        );
        if (!isPasswordValid) {
          return res
            .status(403)
            .json({ success: false, data: "Wrong password" });
        }

        const userJWTToken = await jwt.sign(
          {
            userId: userExists._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
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
          data: {
            userId: userExists._id,
            emailId,
            firstName: userExists.firstName,
            lastName: userExists.lastName,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          data: "Some error has occurred, please try again later",
        });
      }
      break;
  }
};

export default handler;
