import { Inject, Injectable } from '@nestjs/common';
import {
  CHATBOT_GRPC_OUTBOUND_PORT,
  ChatbotGRPCOutboundPort,
} from 'src/ports-adapters/chatbot/chatbot/chatbot.grpc.outbound-port';

@Injectable()
export class ChatbotService {
  constructor(
    @Inject(CHATBOT_GRPC_OUTBOUND_PORT)
    private readonly chatbotGrpc: ChatbotGRPCOutboundPort,
  ) {}
}
