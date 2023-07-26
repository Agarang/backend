import { CreateUserDto } from 'src/dtos/user/create-user.dto';

export type CreateUserDtoForSelect = {
  [P in keyof CreateUserDto as `${P}`]: CreateUserDto[P];
};
