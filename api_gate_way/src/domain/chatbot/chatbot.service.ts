import { Inject, Injectable } from '@nestjs/common';
import {
  CHATBOT_GRPC_OUTBOUND_PORT,
  ChatbotGRPCOutboundPort,
} from 'src/ports-adapters/chatbot/chatbot/chatbot.grpc.outbound-port';
import { GetFetusResponseFromChatbotOutboundPortOutputDto } from 'src/ports-adapters/chatbot/chatbot/interface/chatbot.proto';

@Injectable()
export class ChatbotService {
  constructor(
    @Inject(CHATBOT_GRPC_OUTBOUND_PORT)
    private readonly chatbotGrpc: ChatbotGRPCOutboundPort,
  ) {}

  async sendChatToFetus(
    userId: number,
    input: string,
  ): Promise<GetFetusResponseFromChatbotOutboundPortOutputDto> {
    const response = await this.chatbotGrpc.getFetusResponseFromChatbot({
      input,
      userId,
    });

    return response;
  }
}
