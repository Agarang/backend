import { Controller } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('/api/v1/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}
}
