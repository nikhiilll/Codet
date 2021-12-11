import Joi from "joi";

const userLoginSchema = Joi.object({
  emailId: Joi.string().min(6).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
});

export const validateUserLoginData = (loginData) => {
  return userLoginSchema.validate(loginData);
};

const userRegistrationSchema = Joi.object({
  emailId: Joi.string().min(6).max(64).required(),
  password: Joi.string().min(6).max(64).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).allow("", null),
});

export const validateUserRegistrationData = (registrationData) => {
  return userRegistrationSchema.validate(registrationData);
};

const codePostSchema = Joi.object({
  userId: Joi.string().required(),
  postId: Joi.string().allow("", null),
  emailId: Joi.string().min(6).max(64).allow("", null),
  postName: Joi.string().min(5).max(64).required(),
  description: Joi.string().min(5).max(1024).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).allow("", null),
  published: Joi.boolean().default(false),
  code: {
    css: Joi.string().allow("", null),
    html: Joi.string().allow("", null),
    js: Joi.string().allow("", null),
  },
});

export const validateCodePostData = (codePostData) => {
  return codePostSchema.validate(codePostData);
};
