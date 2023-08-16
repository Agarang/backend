import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

export const GENERATE_FETUS_GRPC_OPTION: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:50051',
    package: 'generate_fetus',
    protoPath: path.join(
      __dirname,
      '../../../../../proto/generate-fetus.proto',
    ),
    loader: {
      enums: String,
      objects: true,
    },
  },
};
