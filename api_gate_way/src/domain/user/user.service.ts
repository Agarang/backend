import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
} from 'src/dtos/user/create-user.dto';
import { DeleteUserOutboundPortOutputDto } from 'src/dtos/user/delete-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import {
  UpdateUserEmailOutboundPortOutputDto,
  UpdateUserEtcInfoInboundPortInputDto,
  UpdateUserNicknameOutboundPortOutputDto,
  UpdateUserPasswordInboundPortInputDto,
  UpdateUserPasswordOutboundPortOutputDto,
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';
import {
  USER_REPOSITORY_OUTBOUND_PORT,
  UserRepositoryOutboundPort,
} from 'src/ports-adapters/user/user.repository.outbound-port';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepository: UserRepositoryOutboundPort,
  ) {}

  async register(
    userInfo: CreateUserDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
    const oldUser = await this.userRepository.findUserForSignUp(userInfo.email);

    if (oldUser !== null) {
      console.log(oldUser);
      throw new BadRequestException('중복된 이메일입니다.');
    }

    const user = await this.userRepository.insertUser(userInfo);

    return user;
  }

  async getUserInfo(
    userId: number,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const user = await this.userRepository.findUserInfo(userId);

    if (!user) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    return user;
  }

  async modifyUserEtcInfo(
    userId: number,
    data: UpdateUserEtcInfoInboundPortInputDto,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const user = await this.userRepository.updateUserInfo(userId, data);

    return user;
  }

  async modifyPhoneNumber(
    userId: number,
    phoneNumber: string,
  ): Promise<UpdateUserPhoneNumberOutboundPortOutputDto> {
    const pn = await this.userRepository.updatePhoneNumber(userId, phoneNumber);

    return pn;
  }

  async modifyNickname(
    userId: number,
    nickname: string,
  ): Promise<UpdateUserNicknameOutboundPortOutputDto> {
    const updatedNickname = await this.userRepository.updateNickname(
      userId,
      nickname,
    );

    return updatedNickname;
  }

  async modifyEmail(
    userId: number,
    email: string,
  ): Promise<UpdateUserEmailOutboundPortOutputDto> {
    const updatedEmail = await this.userRepository.updateEmail(userId, email);

    return updatedEmail;
  }

  async modifyPassword(
    userId: number,
    passwordPair: UpdateUserPasswordInboundPortInputDto,
  ): Promise<UpdateUserPasswordOutboundPortOutputDto> {
    const user = await this.userRepository.updatePassword(userId, passwordPair);

    return user;
  }

  async unregister(userId: number): Promise<DeleteUserOutboundPortOutputDto> {
    const user = await this.userRepository.deleteUser(userId);

    return user;
  }
}
