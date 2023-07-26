import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import {
  USER_REPOSITORY_OUTBOUND_PORT,
  UserRepositoryOutboundPort,
} from 'src/ports-adapters/user/user.repository.outbound-port';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepository: UserRepositoryOutboundPort,
  ) {}

  async register(userInfo: CreateUserDto): Promise<CreateUserDto> {
    const oldUser = await this.userRepository.findUserForSignUp(userInfo.email);

    if (oldUser !== null) {
      console.log(oldUser);
      throw new BadRequestException('중복된 이메일입니다.');
    }

    const user = await this.userRepository.insertUser(userInfo);

    return user;
  }
}
