import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export interface CreateUserDto
  extends OmitProperties<
    UserEntity,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {
  passwordConfirm: string;
}

export type CreateUserOutboundPortOutputDto = OmitProperties<
  UserEntity,
  'updatedAt' | 'deletedAt'
>;

export type CreateUserOutboundPortOutputDtoForSelect = {
  [P in keyof CreateUserOutboundPortOutputDto as `${P}`]: CreateUserOutboundPortOutputDto[P];
};
