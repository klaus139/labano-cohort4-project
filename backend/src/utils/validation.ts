import Joi from "joi";

export const userRegistrationSchema = Joi.object().keys({

  email:Joi.string().required(),
  firstname:Joi.string().required(),
  lastname:Joi.string().required(),
  password:Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
  confirm_password:Joi.any().equal(Joi.ref("password")).required().label("Confirm Password").messages({ "any.only":"{{#label}} does not match" }),

})

export const hotelCreationSchema = Joi.object().keys({
  name:Joi.string().required(),
  city:Joi.string().required(),
  country:Joi.string().required(),
  description:Joi.string().required(),
  type:Joi.string().required(),
  facilities:Joi.string().required(),
  pricePerNight:Joi.number().required(),

})

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
});
