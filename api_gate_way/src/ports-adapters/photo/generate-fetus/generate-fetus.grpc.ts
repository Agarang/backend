import { Injectable, OnModuleInit } from '@nestjs/common';
import { GenerateFetusGRPCOutboundPort } from './generate-fetus.grpc.outbound-port';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GENERATE_FETUS_GRPC_OPTION } from './options/generate-fetus.grpc-option';
import {
  GenerateFetusGRPCOutboundPortOutputDto,
  IGenerateFetusService,
} from './interface/generate-fetus.proto';

@Injectable()
export class GenerateFetusGRPC
  implements GenerateFetusGRPCOutboundPort, OnModuleInit
{
  constructor() {}

  @Client(GENERATE_FETUS_GRPC_OPTION)
  private readonly generateFetusClient: ClientGrpc;

  private generateFetusService: IGenerateFetusService;

  onModuleInit() {
    this.generateFetusService =
      this.generateFetusClient.getService<IGenerateFetusService>(
        'GenerateFetusService',
      );
  }

  async generateFetusImage(
    url: string,
  ): Promise<GenerateFetusGRPCOutboundPortOutputDto> {
    const res: GenerateFetusGRPCOutboundPortOutputDto =
      await this.generateFetusService.generateFetusImage({
        url,
      });

    return res;
  }
}
