import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export type UpdateUserDto = Partial<
  OmitProperties<UserEntity, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>
>;

export type UpdateUserEtcInfoInboundPortInputDto = OmitProperties<
  UserEntity,
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'id'
  | 'email'
  | 'password'
  | 'phoneNumber'
  | 'profilePhotoUrl'
  | 'nickname'
>;

// update phone number

export type UpdateUserPhoneNumberInboundPortInputDto = Pick<
  UserEntity,
  'phoneNumber'
>;

export type UpdateUserPhoneNumberOutboundPortOutputDto = Pick<
  UserEntity,
  'phoneNumber'
>;

// update nickname
export type UpdateUserNicknameInboundPortInputDto = Pick<
  UserEntity,
  'nickname'
>;

export type UpdateUserNicknameOutboundPortOutputDto = Pick<
  UserEntity,
  'nickname'
>;

// update email
export type UpdateUserEmailInboundPortInputDto = Pick<UserEntity, 'email'>;

export type UpdateUserEmailOutboundPortOutputDto = Pick<UserEntity, 'email'>;

// update password
export interface UpdateUserPasswordInboundPortInputDto
  extends Pick<UserEntity, 'password'> {
  passwordConfirm: string;
}

export type UpdateUserPasswordOutboundPortOutputDto = OmitProperties<
  UserEntity,
  'password'
>;

export type UpdateUserPasswordOutboundPortOutputDtoForSelect = {
  [P in keyof UpdateUserPasswordOutboundPortOutputDto as `${P}`]: UpdateUserPasswordOutboundPortOutputDto[P];
};
