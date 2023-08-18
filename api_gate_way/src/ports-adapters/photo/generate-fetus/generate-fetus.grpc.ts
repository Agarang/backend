import { Injectable, OnModuleInit } from '@nestjs/common';
import { GenerateFetusGRPCOutboundPort } from './generate-fetus.grpc.outbound-port';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { GENERATE_FETUS_GRPC_OPTION } from './options/generate-fetus.grpc-option';
import {
  GenerateFetusGRPCOutboundPortInputDto,
  GenerateFetusGRPCOutboundPortOutputDto,
  IGenerateFetusService,
} from './interface/generate-fetus.proto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GenerateFetusGRPC
  implements GenerateFetusGRPCOutboundPort, OnModuleInit
{
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
    params: GenerateFetusGRPCOutboundPortInputDto,
  ): Promise<GenerateFetusGRPCOutboundPortOutputDto> {
    try {
      const res = this.generateFetusService.generateFetusImage({
        ...params,
      });

      const a = await lastValueFrom(res);

      console.log('aaaaaaaaaaaa');
      console.log(a);

      return a;
    } catch (err) {
      console.log(err);
      throw new RpcException('RPC 통신 오류');
    }
  }
}
