import { UserEntity } from 'src/config/database/models/user.entity';

export type DeleteUserOutboundPortOutputDto = Pick<
  UserEntity,
  'id' | 'nickname' | 'name' | 'email' | 'deletedAt' | 'createdAt'
>;

export type DeleteUserOutboundPortOutputDtoForSelect = {
  [P in keyof DeleteUserOutboundPortOutputDto as `${P}`]: DeleteUserOutboundPortOutputDto[P];
};
