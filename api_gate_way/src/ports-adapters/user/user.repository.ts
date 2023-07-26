import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertUser(userInfo: CreateUserDto): Promise<CreateUserDto> {
    const user = this.prisma.user.create({
      select: typia.random<TypeToSelect<CreateUserDto>>(),
      data: { ...userInfo, createdAt: new Date().toISOString() },
    });

    return user;
  }
}
