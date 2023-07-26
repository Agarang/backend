import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';
import { UserEntity } from 'src/config/database/models/user.entity';
import { CreateUserDtoForSelect } from 'src/dtos/common/select/user-select.dto';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertUser(userInfo: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.prisma.user.create({
      select: typia.random<TypeToSelect<CreateUserDtoForSelect>>(),
      data: { ...userInfo, createdAt: new Date().toISOString() },
    });

    return user;
  }

  async findUserForSignUp(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
