import mongoose from "mongoose";

/*
USER SCHEMA
============
-postId -> documentId/ObjectID from MongoDB 
-userid -> id of the user who created the post
-postName -> String
-description -> String
-firstName -> String
-lastName -> String
-published -> boolean
-code -> {
    -js -> String
    -css -> String
    -html -> String
}
-createdDate -> Date
*/

const codeSchema = mongoose.Schema({
  css: String,
  js: String,
  html: String,
});

const codePostSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    maxlength: [64, "E-mail Id cannot more than 64 characters"],
  },
  postName: {
    type: String,
    required: [true, "Please enter a post name"],
    maxlength: 64,
  },
  description: {
    type: String,
    required: [true, "Please enter post description"],
    maxlength: 1024,
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
  published: {
    type: Boolean,
    default: false,
  },
  code: {
    type: codeSchema,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.CodePost ||
  mongoose.model("CodePost", codePostSchema);
