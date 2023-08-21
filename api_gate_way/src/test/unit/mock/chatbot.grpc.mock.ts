import { ChatbotGRPCOutboundPort } from 'src/ports-adapters/chatbot/chatbot/chatbot.grpc.outbound-port';
import {
  GetFetusResponseFromChatbotOutboundPortInputDto,
  GetFetusResponseFromChatbotOutboundPortOutputDto,
} from 'src/ports-adapters/chatbot/chatbot/interface/chatbot.proto';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockChatbotGRPCParamType = MockParamTypeForTest<MockChatbotGRPC>;

export class MockChatbotGRPC implements ChatbotGRPCOutboundPort {
  private readonly result: MockChatbotGRPCParamType;

  constructor(result: MockChatbotGRPCParamType) {
    this.result = result;
  }

  async getFetusResponseFromChatbot(
    params: GetFetusResponseFromChatbotOutboundPortInputDto,
  ): Promise<GetFetusResponseFromChatbotOutboundPortOutputDto> {
    const res = await this.result.getFetusResponseFromChatbot?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
