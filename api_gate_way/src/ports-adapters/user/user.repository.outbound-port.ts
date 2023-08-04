import { UserEntity } from 'src/config/database/models/user.entity';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
} from 'src/dtos/user/create-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import {
  UpdateUserDto,
  UpdateUserEmailOutboundPortOutputDto,
  UpdateUserNicknameOutboundPortOutputDto,
  UpdateUserPasswordInboundPortInputDto,
  UpdateUserPasswordOutboundPortOutputDto,
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';

export const USER_REPOSITORY_OUTBOUND_PORT =
  'USER_REPOSITORY_OUTBOUND_PORT' as const;

export interface UserRepositoryOutboundPort {
  insertUser(userInfo: CreateUserDto): Promise<CreateUserOutboundPortOutputDto>;
  findUserForSignUp(email: string): Promise<UserEntity | null>;
  findUserInfo(
    userId: number,
  ): Promise<FindUserInfoOutboundPortOutputDto | null>;
  updateUserInfo(
    userId: number,
    data: UpdateUserDto,
  ): Promise<FindUserInfoOutboundPortOutputDto>;
  updatePhoneNumber(
    userId: number,
    phoneNumber: string,
  ): Promise<UpdateUserPhoneNumberOutboundPortOutputDto>;
  updateNickname(
    userId: number,
    nickname: string,
  ): Promise<UpdateUserNicknameOutboundPortOutputDto>;
  updateEmail(
    userId: number,
    email: string,
  ): Promise<UpdateUserEmailOutboundPortOutputDto>;
  updatePassword(
    userId: number,
    passwordPair: UpdateUserPasswordInboundPortInputDto,
  ): Promise<UpdateUserPasswordOutboundPortOutputDto>;
}
