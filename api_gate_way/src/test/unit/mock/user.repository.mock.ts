import { UserEntity } from 'src/config/database/models/user.entity';
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
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';
import { UserRepositoryOutboundPort } from 'src/ports-adapters/user/user.repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';
import { OmitProperties } from 'src/utils/types/omit.type';

type MockUserRepositoryParamType = MockParamTypeForTest<MockUserRepository>;

export class MockUserRepository implements UserRepositoryOutboundPort {
  private readonly result: MockUserRepositoryParamType;

  constructor(result: MockUserRepositoryParamType) {
    this.result = result;
  }

  async insertUser(
    userInfo: CreateUserDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
    const res = this.result.insertUser?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async findUserForSignUp(email: string): Promise<UserEntity | null> {
    const res = this.result.findUserForSignUp?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async findUserInfo(
    userId: number,
  ): Promise<FindUserInfoOutboundPortOutputDto | null> {
    const res = this.result.findUserInfo?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updateUserInfo(
    userId: number,
    data: UpdateUserEtcInfoInboundPortInputDto,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const res = this.result.updateUserInfo?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updatePhoneNumber(
    userId: number,
    phoneNumber: string,
  ): Promise<UpdateUserPhoneNumberOutboundPortOutputDto> {
    const res = this.result.updatePhoneNumber?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updateNickname(
    userId: number,
    nickname: string,
  ): Promise<UpdateUserNicknameOutboundPortOutputDto> {
    const res = this.result.updateNickname?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updateEmail(
    userId: number,
    email: string,
  ): Promise<UpdateUserEmailOutboundPortOutputDto> {
    const res = this.result.updateEmail?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async updatePassword(
    userId: number,
    passwordPair: UpdateUserPasswordInboundPortInputDto,
  ): Promise<OmitProperties<UserEntity, 'password'>> {
    const res = this.result.updatePassword?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async deleteUser(userId: number): Promise<DeleteUserOutboundPortOutputDto> {
    const res = this.result.deleteUser?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
