import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

export const GENERATE_FETUS_GRPC_OPTION: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'generate_fetus_grpc_server:50051',
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
