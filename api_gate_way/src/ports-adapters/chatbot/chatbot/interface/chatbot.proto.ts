import { Observable } from 'rxjs';

export interface GetFetusResponseFromChatbotOutboundPortInputDto {
  input: string;
  userId: number;
}

export interface GetFetusResponseFromChatbotOutboundPortOutputDto {
  response: string;
  createdAt: string;
}

export interface IChatbotService {
  getFetusResponseFromChatbot(
    params: GetFetusResponseFromChatbotOutboundPortInputDto,
  ): Observable<GetFetusResponseFromChatbotOutboundPortOutputDto>;
}
