import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export type CreateUserDto = OmitProperties<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type CreateUserOutboundPortOutputDto = OmitProperties<
  UserEntity,
  'updatedAt' | 'deletedAt'
>;

export type CreateUserOutboundPortOutputDtoForSelect = {
  [P in keyof CreateUserOutboundPortOutputDto as `${P}`]: CreateUserOutboundPortOutputDto[P];
};
