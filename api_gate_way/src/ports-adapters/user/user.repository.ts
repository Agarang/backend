import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import {
  CreateUserDto,
  CreateUserDtoForSelect,
} from 'src/dtos/user/create-user.dto';
import typia from 'typia';
import { TypeToSelect } from 'src/utils/types/type-to-select.type';
import { UserEntity } from 'src/config/database/models/user.entity';
import * as bcrypt from 'bcrypt';
import { dateToString } from 'src/utils/functions/date-to-string.function';
import {
  FindUserInfoOutboundPortOutputDto,
  FindUserInfoOutboundPortOutputDtoForSelect,
} from 'src/dtos/user/find-user-info.dto';
import { OmitProperties } from 'src/utils/types/omit.type';
import { UpdateUserDto } from 'src/dtos/user/update-user.dto';

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

  async findUserInfo(
    userId: number,
  ): Promise<FindUserInfoOutboundPortOutputDto | null> {
    const user = await this.prisma.user.findFirst({
      select:
        typia.random<
          TypeToSelect<FindUserInfoOutboundPortOutputDtoForSelect>
        >(),
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return dateToString(user);
  }

  async updateUserInfo(
    userId: number,
    data: UpdateUserDto,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const user = await this.prisma.user.update({
      select:
        typia.random<
          TypeToSelect<FindUserInfoOutboundPortOutputDtoForSelect>
        >(),
      data: { ...data },
      where: {
        id: userId,
      },
    });

    return dateToString(user);
  }
}
