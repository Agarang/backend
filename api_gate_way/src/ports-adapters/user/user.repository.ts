import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';
import { UserEntity } from 'src/config/database/models/user.entity';
import { CreateUserDtoForSelect } from 'src/dtos/common/select/user-select.dto';
import * as bcrypt from 'bcrypt';
import { dateToString } from 'src/utils/functions/date-to-string.function';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertUser(userInfo: CreateUserDto): Promise<CreateUserDto> {
    const { password, ...data } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      select: typia.random<TypeToSelect<CreateUserDtoForSelect>>(),
      data: { ...data, password: hashedPassword },
    });

    return dateToString(user);
  }

  async findUserForSignUp(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return dateToString(user);
  }
}
