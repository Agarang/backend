import { UserEntity } from 'src/config/database/models/user.entity';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';

export const USER_REPOSITORY_OUTBOUND_PORT =
  'USER_REPOSITORY_OUTBOUND_PORT' as const;

export interface UserRepositoryOutboundPort {
  insertUser(userInfo: CreateUserDto): Promise<CreateUserDto>;
  findUserForSignUp(email: string): Promise<UserEntity | null>;
}
