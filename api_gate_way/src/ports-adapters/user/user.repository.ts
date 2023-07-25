import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}
}
