import { ChatbotService } from 'src/domain/chatbot/chatbot.service';
import { MockChatbotGRPC } from './mock/chatbot.grpc.mock';
import typia from 'typia';
import { GetFetusResponseFromChatbotOutboundPortOutputDto } from 'src/ports-adapters/chatbot/chatbot/interface/chatbot.proto';
import { ChatbotController } from 'src/domain/chatbot/chatbot.controller';
import { LocalToken } from 'src/dtos/auth/local-token.dto';

describe('Chatbot Spec', () => {
  let user: LocalToken;
  beforeAll(async () => {
    user = typia.random<LocalToken>();
  });

  describe('1. Send Chat To Fetus', () => {
    it('1-1. Chat To Fetus Normally', async () => {
      const response =
        typia.random<GetFetusResponseFromChatbotOutboundPortOutputDto>();

      const chatbotService = new ChatbotService(
        new MockChatbotGRPC({
          getFetusResponseFromChatbot: [response],
        }),
      );

      const chatbotController = new ChatbotController(chatbotService);

      const res = await chatbotController.sendChatToFetus(user, {
        input: 'hi',
      });

      expect(res.data).toStrictEqual(response);
    });
  });
});
