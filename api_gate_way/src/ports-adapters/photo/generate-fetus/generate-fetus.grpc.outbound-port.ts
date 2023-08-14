import {
  GenerateFetusGRPCOutboundPortInputDto,
  GenerateFetusGRPCOutboundPortOutputDto,
} from './interface/generate-fetus.proto';

export const GENERATE_FETUS_GRPC_OUTBOUND_PORT =
  'GENERATE_FETUS_GRPC_OUTBOUND_PORT' as const;

export interface GenerateFetusGRPCOutboundPort {
  generateFetusImage(
    params: GenerateFetusGRPCOutboundPortInputDto,
  ): Promise<GenerateFetusGRPCOutboundPortOutputDto>;
}
