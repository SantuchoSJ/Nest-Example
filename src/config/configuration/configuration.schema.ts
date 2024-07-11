import * as Joi from "joi";
export const configurationSchema = Joi.object({
  PORT: Joi.string().required(),
  DOMAIN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  NOSQL_DATABASE_HOST: Joi.string().required(),
  SQL_DATABASE_HOST: Joi.string().required(),
  SQL_DATABASE_PORT: Joi.number().required(),
  SQL_DATABASE_USERNAME: Joi.string().required(),
  SQL_DATABASE_PASSWORD: Joi.string().required(),
  SQL_DATABASE_NAME: Joi.string().required(),
  NOTIFICATIONS_HOST: Joi.string().required(),
  NOTIFICATIONS_PATH: Joi.string().required(),
});
