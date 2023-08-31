import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { CHATBOT_GRPC_OUTBOUND_PORT } from 'src/ports-adapters/chatbot/chatbot/chatbot.grpc.outbound-port';
import { ChatbotGRPC } from 'src/ports-adapters/chatbot/chatbot/chatbot.grpc';

@Module({
  imports: [],
  controllers: [ChatbotController],
  providers: [
    {
      provide: CHATBOT_GRPC_OUTBOUND_PORT,
      useClass: ChatbotGRPC,
    },
    ChatbotService,
  ],
})
export class ChatbotModule {}
