import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export type UpdateUserDto = Partial<
  OmitProperties<UserEntity, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>
>;
