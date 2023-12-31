import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
  CreateUserOutboundPortOutputDtoForSelect,
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
import {
  UpdateUserDto,
  UpdateUserEmailOutboundPortOutputDto,
  UpdateUserNicknameOutboundPortOutputDto,
  UpdateUserPasswordInboundPortInputDto,
  UpdateUserPasswordOutboundPortOutputDto,
  UpdateUserPasswordOutboundPortOutputDtoForSelect,
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';
import {
  DeleteUserOutboundPortOutputDto,
  DeleteUserOutboundPortOutputDtoForSelect,
} from 'src/dtos/user/delete-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}

  async insertUser(
    userInfo: CreateUserDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
    const { password, passwordConfirm, ...data } = userInfo;
    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 다릅니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      select:
        typia.random<TypeToSelect<CreateUserOutboundPortOutputDtoForSelect>>(),
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

  async updatePhoneNumber(
    userId: number,
    phoneNumber: string,
  ): Promise<UpdateUserPhoneNumberOutboundPortOutputDto> {
    const pn = await this.prisma.user.update({
      select: { phoneNumber: true },
      where: {
        id: userId,
      },
      data: {
        phoneNumber,
      },
    });

    return pn;
  }

  async updateNickname(
    userId: number,
    nickname: string,
  ): Promise<UpdateUserNicknameOutboundPortOutputDto> {
    const existedNickname = await this.prisma.user.findFirst({
      select: { nickname: true },
      where: { nickname },
    });

    if (existedNickname !== null) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다.');
    }

    const updatedNickname = await this.prisma.user.update({
      select: { nickname: true },
      where: { id: userId },
      data: {
        nickname,
      },
    });

    return updatedNickname;
  }

  async updateEmail(
    userId: number,
    email: string,
  ): Promise<UpdateUserEmailOutboundPortOutputDto> {
    const existedEmail = await this.prisma.user.findFirst({
      select: { email: true },
      where: { email },
    });

    if (existedEmail !== null) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const updatedEmail = await this.prisma.user.update({
      select: { email: true },
      where: { id: userId },
      data: {
        email,
      },
    });

    return updatedEmail;
  }

  async updatePassword(
    userId: number,
    passwordPair: UpdateUserPasswordInboundPortInputDto,
  ): Promise<UpdateUserPasswordOutboundPortOutputDto> {
    const originPassword = await this.prisma.user.findFirst({
      select: { password: true },
      where: { id: userId },
    });

    if (!originPassword) {
      throw new BadRequestException('잘못된 유저 정보입니다.');
    }

    const isPasswordMatch = await bcrypt.compare(
      passwordPair.currentPassword,
      originPassword.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('현재 비밀번호가 다릅니다.');
    }

    if (passwordPair.modifiedPassword !== passwordPair.passwordConfirm) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 다릅니다.');
    }

    const hashedPassword = await bcrypt.hash(passwordPair.passwordConfirm, 10);

    const user = await this.prisma.user.update({
      select:
        typia.random<
          TypeToSelect<UpdateUserPasswordOutboundPortOutputDtoForSelect>
        >(),
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return dateToString(user);
  }

  async deleteUser(userId: number): Promise<DeleteUserOutboundPortOutputDto> {
    const user = await this.prisma.user.update({
      select:
        typia.random<TypeToSelect<DeleteUserOutboundPortOutputDtoForSelect>>(),
      where: { id: userId },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });

    return dateToString(user);
  }
}
