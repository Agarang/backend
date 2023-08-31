import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY_OUTBOUND_PORT,
  UserRepositoryOutboundPort,
} from 'src/ports-adapters/user/user.repository.outbound-port';
import { compare } from 'bcrypt';
import { IAccessTokenReturn, LocalToken } from 'src/dtos/auth/local-token.dto';
import { JwtService } from '@nestjs/jwt';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepository: UserRepositoryOutboundPort,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const user = await this.userRepository.findUserForSignUp(email);

    if (!user) {
      throw new BadRequestException('잘못된 이메일입니다.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('비밀번호가 틀렸습니다.');
    }
    const { password: pwd, updatedAt, deletedAt, ...res } = user;

    return res;
  }

  async issueTokenForLocalSignIn(
    user: FindUserInfoOutboundPortOutputDto,
  ): Promise<IAccessTokenReturn> {
    const token: LocalToken = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };

    return {
      accessToken: this.jwtService.sign(token),
      ...user,
    };
  }
}
