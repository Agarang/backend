import { UserEntity } from 'src/config/database/models/user.entity';
import { OmitProperties } from 'src/utils/types/omit.type';

export type FindUserInfoOutboundPortOutputDto = OmitProperties<
  UserEntity,
  'updatedAt' | 'deletedAt' | 'password'
>;

export type FindUserInfoOutboundPortOutputDtoForSelect = {
  [P in keyof FindUserInfoOutboundPortOutputDto as `${P}`]: FindUserInfoOutboundPortOutputDto[P];
};
