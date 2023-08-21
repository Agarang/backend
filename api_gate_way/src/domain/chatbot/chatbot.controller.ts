import { Controller, UseGuards } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import { JwtLocalGuard } from 'src/auth/guards/jwt-local.guard';
import { User } from 'src/middlewares/decorators/user.decorator';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import {
  ResponseForm,
  responseForm,
} from 'src/middlewares/interceptors/transform.interceptor';
import { GetFetusResponseFromChatbotOutboundPortOutputDto } from 'src/ports-adapters/chatbot/chatbot/interface/chatbot.proto';
import { SendChatToFetusInboundPortInputDto } from 'src/dtos/chatbot/send-chat.dto';

@Controller('/api/v1/chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Post('fetus')
  async sendChatToFetus(
    @User() user: LocalToken,
    @TypedBody() body: SendChatToFetusInboundPortInputDto,
  ): Promise<ResponseForm<GetFetusResponseFromChatbotOutboundPortOutputDto>> {
    const res = await this.chatbotService.sendChatToFetus(user.id, body.input);

    return responseForm(res);
  }
}
