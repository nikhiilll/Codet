import jwt from "jsonwebtoken";
import dbConnect from "./mongodb";
import User from "../models/User";

const verifyAuthToken = async (userToken) => {
  try {
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    return { isValid: true, data: { ...decoded } };
  } catch (err) {
    return { isValid: false, data: null };
  }
};

const getUserData = async (userId) => {
  if (!userId) return null;

  try {
    await dbConnect();
    const user = await User.findById(userId);
    return {
      userId: user._id.toString(),
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export { verifyAuthToken, getUserData };
