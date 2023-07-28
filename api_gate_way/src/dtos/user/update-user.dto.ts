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
