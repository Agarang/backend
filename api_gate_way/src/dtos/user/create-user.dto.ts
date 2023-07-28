import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export type CreateUserDto = OmitProperties<
  UserEntity,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type CreateUserDtoForSelect = {
  [P in keyof CreateUserDto as `${P}`]: CreateUserDto[P];
};
