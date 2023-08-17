import { INestiaConfig } from '@nestia/sdk';
import * as dotenv from 'dotenv';

dotenv.config();
export const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  distribute: 'packages',

  swagger: {
    output: 'swagger.json',
    servers: [
      {
        url: `http://localhost:80`,
      },
      {
        url: `http://localhost:${process.env.NEST_PORT}`,
        description: 'localhost',
      },
    ],
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Authorization',
      },
    },
  },

  /**
   * @default true
   */
  primitive: false,
};
export default config;
