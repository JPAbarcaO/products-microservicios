import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  NATS_SERVERS: string;
  PORT: number;
  ORDER_MICROSERVICES_HOST: string;
  ORDER_MICROSERVICES_PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.string().required(),
    ORDER_MICROSERVICES_HOST: joi.string().required(),
    ORDER_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  orderMicroserviceHost: envVars.ORDER_MICROSERVICES_HOST,
  orderMicroservicePort: envVars.ORDER_MICROSERVICES_PORT,
};
