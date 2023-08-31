import { Injectable } from '@nestjs/common';
import { ChatbotRepositoryOutboundPort } from './chatbot.repository.outbound-port';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class ChatbotRepository implements ChatbotRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}
}
