import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  NATS_SERVERS: string;
  PORT: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.string().required(),
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
};
