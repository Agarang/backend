import { Body, Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedBody, TypedRoute } from '@nestia/core';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
} from 'src/dtos/user/create-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { JwtLocalGuard } from 'src/auth/guards/jwt-local.guard';
import { User } from 'src/middlewares/decorators/user.decorator';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import {
  UpdateUserEmailInboundPortInputDto,
  UpdateUserEmailOutboundPortOutputDto,
  UpdateUserEtcInfoInboundPortInputDto,
  UpdateUserNicknameInboundPortInputDto,
  UpdateUserNicknameOutboundPortOutputDto,
  UpdateUserPasswordInboundPortInputDto,
  UpdateUserPasswordOutboundPortOutputDto,
  UpdateUserPhoneNumberInboundPortInputDto,
  UpdateUserPhoneNumberOutboundPortOutputDto,
} from 'src/dtos/user/update-user.dto';
import { DeleteUserOutboundPortOutputDto } from 'src/dtos/user/delete-user.dto';
import {
  ResponseForm,
  responseForm,
} from 'src/middlewares/interceptors/transform.interceptor';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post('sign-up')
  async register(
    @TypedBody() userInfo: CreateUserDto,
  ): Promise<ResponseForm<CreateUserOutboundPortOutputDto>> {
    const user = await this.userService.register(userInfo);

    return responseForm(user);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Get('info')
  async getOwnUserInfo(
    @User() user: LocalToken,
  ): Promise<ResponseForm<FindUserInfoOutboundPortOutputDto>> {
    const userId = user.id;

    const userInfo = await this.userService.getUserInfo(userId);

    return responseForm(userInfo);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('info')
  async modifyUserEtcInfo(
    @User() user: LocalToken,
    @TypedBody() body: UpdateUserEtcInfoInboundPortInputDto,
  ): Promise<ResponseForm<FindUserInfoOutboundPortOutputDto>> {
    const userInfo = await this.userService.modifyUserEtcInfo(user.id, body);

    return responseForm(userInfo);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('phone-number')
  async modifyPhoneNumber(
    @User() user: LocalToken,
    @TypedBody() body: UpdateUserPhoneNumberInboundPortInputDto,
  ): Promise<ResponseForm<UpdateUserPhoneNumberOutboundPortOutputDto>> {
    const phoneNumber = await this.userService.modifyPhoneNumber(
      user.id,
      body.phoneNumber,
    );

    return responseForm(phoneNumber);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('nickname')
  async modifyNickname(
    @User() user: LocalToken,
    @Body() body: UpdateUserNicknameInboundPortInputDto,
  ): Promise<ResponseForm<UpdateUserNicknameOutboundPortOutputDto>> {
    const nickname = await this.userService.modifyNickname(
      user.id,
      body.nickname,
    );

    return responseForm(nickname);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('email')
  async modifyEmail(
    @User() user: LocalToken,
    @Body() body: UpdateUserEmailInboundPortInputDto,
  ): Promise<ResponseForm<UpdateUserEmailOutboundPortOutputDto>> {
    const email = await this.userService.modifyEmail(user.id, body.email);

    return responseForm(email);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Put('password')
  async modifyPassword(
    @User() user: LocalToken,
    @Body() body: UpdateUserPasswordInboundPortInputDto,
  ): Promise<ResponseForm<UpdateUserPasswordOutboundPortOutputDto>> {
    const userInfo = await this.userService.modifyPassword(user.id, {
      ...body,
    });

    return responseForm(userInfo);
  }

  @UseGuards(JwtLocalGuard)
  @TypedRoute.Delete()
  async unregister(
    @User() user: LocalToken,
  ): Promise<ResponseForm<DeleteUserOutboundPortOutputDto>> {
    const deletedUser = await this.userService.unregister(user.id);

    return responseForm(deletedUser);
  }
}
