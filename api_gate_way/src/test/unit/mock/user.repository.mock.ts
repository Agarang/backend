import { UserEntity } from 'src/config/database/models/user.entity';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { UserRepositoryOutboundPort } from 'src/ports-adapters/user/user.repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';
import { OmitProperties } from 'src/utils/types/omit.type';

type MockUserRepositoryParamType = MockParamTypeForTest<MockUserRepository>;

export class MockUserRepository implements UserRepositoryOutboundPort {
  private readonly result: MockUserRepositoryParamType;

  constructor(result: MockUserRepositoryParamType) {
    this.result = result;
  }

  async insertUser(userInfo: CreateUserDto): Promise<CreateUserDto> {
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
}
