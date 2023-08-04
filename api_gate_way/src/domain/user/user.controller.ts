import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
} from 'src/dtos/user/create-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { JwtLocalGuard } from 'src/auth/guards/jwt-local.guard';
import { User } from 'src/middlewares/decorators/user.decorator';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import {
  UpdateUserEtcInfoInboundPortInputDto,
  UpdateUserPhoneNumberInboundPortInputDto,
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post('sign-up')
  async register(
    @TypedBody() userInfo: CreateUserDto,
  ): Promise<CreateUserOutboundPortOutputDto> {
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

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('info')
  async modifyUserEtcInfo(
    @User() user: LocalToken,
    @TypedBody() body: UpdateUserEtcInfoInboundPortInputDto,
  ): Promise<FindUserInfoOutboundPortOutputDto> {
    const userInfo = await this.userService.modifyUserEtcInfo(user.id, body);

    return userInfo;
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('phone-number')
  async modifyPhoneNumber(
    @User() user: LocalToken,
    @TypedBody() body: UpdateUserPhoneNumberInboundPortInputDto,
  ): Promise<UpdateUserPhoneNumberOutboundPortOutputDto> {
    const phoneNumber = await this.userService.modifyPhoneNumber(
      user.id,
      body.phoneNumber,
    );

    return phoneNumber;
  }
}
