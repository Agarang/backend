import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { JwtLocalGuard } from 'src/auth/guards/jwt-local.guard';
import { User } from 'src/middlewares/decorators/user.decorator';
import { LocalToken } from 'src/dtos/auth/local-token.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post('sign-up')
  async register(@TypedBody() userInfo: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.register(userInfo);

    return user;
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Get('info')
  async getOwnUserInfo(
    @User() user: LocalToken,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const userId = user.id;

    const userInfo = await this.userService.getUserInfo(userId);

    return userInfo;
  }
}
