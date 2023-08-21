import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatbotGRPCOutboundPort } from './chatbot.grpc.outbound-port';
import { Client, ClientGrpc, RpcException } from '@nestjs/microservices';
import { CHATBOT_GRPC_OPTION } from './options/chatbot.grpc-option';
import {
  GetFetusResponseFromChatbotOutboundPortInputDto,
  GetFetusResponseFromChatbotOutboundPortOutputDto,
  IChatbotService,
} from './interface/chatbot.proto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ChatbotGRPC implements ChatbotGRPCOutboundPort, OnModuleInit {
  @Client(CHATBOT_GRPC_OPTION)
  private readonly chatbotClient: ClientGrpc;

  private chatbotService: IChatbotService;

  onModuleInit() {
    this.chatbotService =
      this.chatbotClient.getService<IChatbotService>('ChatbotService');
  }

  async getFetusResponseFromChatbot(
    params: GetFetusResponseFromChatbotOutboundPortInputDto,
  ): Promise<GetFetusResponseFromChatbotOutboundPortOutputDto> {
    try {
      const response = this.chatbotService.getFetusResponseFromChatbot({
        ...params,
      });

      const res = await lastValueFrom(response);

      return res;
    } catch (err) {
      console.log(err);
      throw new RpcException('RPC 통신 오류');
    }
  }
}
