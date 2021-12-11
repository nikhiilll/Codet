import mongoose from "mongoose";

/*
USER SCHEMA
============
-userid -> documentId/ObjectID from MongoDB
-emailId -> String
-password -> String of hashed password
-First Name -> String
-Last Name -> String
*/

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: [true, "Please enter an email-id"],
    maxlength: [64, "E-mail Id cannot more than 64 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    maxlength: [64, "Password cannot more than 64 characters"],
  },
  firstName: {
    type: String,
    required: [true, "Please enter a first name"],
    maxlength: [30, "First name cannot more than 30 characters"],
  },
  lastName: {
    type: String,
    maxlength: [30, "First name cannot more than 30 characters"],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
