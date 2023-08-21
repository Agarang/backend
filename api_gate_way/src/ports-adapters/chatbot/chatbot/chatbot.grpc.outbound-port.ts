import {
  GetFetusResponseFromChatbotOutboundPortInputDto,
  GetFetusResponseFromChatbotOutboundPortOutputDto,
} from './interface/chatbot.proto';

export const CHATBOT_GRPC_OUTBOUND_PORT = 'CHATBOT_GRPC_OUTBOUND_PORT' as const;

export interface ChatbotGRPCOutboundPort {
  getFetusResponseFromChatbot(
    params: GetFetusResponseFromChatbotOutboundPortInputDto,
  ): Promise<GetFetusResponseFromChatbotOutboundPortOutputDto>;
}
