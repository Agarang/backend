import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const CHATBOT_GRPC_OPTION: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${
      process.env.NODE_ENV === 'development'
        ? '127.0.0.1'
        : 'chatbot_grpc_server'
    }`,
    package: 'chatbot',
    protoPath: path.join(__dirname, '../../../../../proto/chatbot.proto'),
    loader: {
      enums: String,
      objects: true,
    },
  },
};
