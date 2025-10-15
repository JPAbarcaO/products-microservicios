import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PRODUCT_MICROSERVICES_PORT: number;
  PRODUCT_MICROSERVICES_HOST: string;
  PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCT_MICROSERVICES_PORT: joi.number().required(),
    PRODUCT_MICROSERVICES_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORT,
  productsMicroservicesPort: envVars.PRODUCT_MICROSERVICES_PORT,
  productsMicroservicesHost: envVars.PRODUCT_MICROSERVICES_HOST,
};
