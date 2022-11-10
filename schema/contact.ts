import Joi from 'joi';
import { Contact } from '../interface/contact';

export const contactSchema = Joi.object<Contact>({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(9)
    .required(),
  affair: Joi.string().required(),
  message: Joi.string().required(),
});
