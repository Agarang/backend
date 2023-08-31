import { UserEntity } from 'src/config/database/models/user.entity';

export type LogInUserDto = Pick<UserEntity, 'email' | 'password'>;
