import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_OUTBOUND_PORT,
  UserRepositoryOutboundPort,
} from 'src/ports-adapters/user/user.repository.outbound-port';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepository: UserRepositoryOutboundPort,
  ) {}

  async validateUser(email: string, password: string): Promise<CreateUserDto> {
    const user = await this.userRepository.findUserForSignUp(email);

    if (!user) {
      throw new BadRequestException('잘못된 이메일입니다.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }

    const { id, createdAt, updatedAt, deletedAt, ...res } = user;

    return res;
  }
}
