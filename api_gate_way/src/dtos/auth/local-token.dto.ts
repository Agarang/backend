import { UserEntity } from 'src/config/database/models/user.entity';
import { FindUserInfoOutboundPortOutputDto } from '../user/find-user-info.dto';

export type LocalToken = Pick<UserEntity, 'id' | 'email' | 'nickname'>;

export interface IAccessTokenReturn extends FindUserInfoOutboundPortOutputDto {
  accessToken: string;
}
