import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/middlewares/decorators/user.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAccessTokenReturn, LocalToken } from 'src/dtos/auth/local-token.dto';
import { LogInUserDto } from 'src/dtos/user/login-user.dto';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import {
  ResponseForm,
  responseForm,
} from 'src/middlewares/interceptors/transform.interceptor';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @TypedRoute.Post('sign-in')
  async localSignIn(
    @User() user: FindUserInfoOutboundPortOutputDto,
    @TypedBody() body: LogInUserDto,
  ): Promise<ResponseForm<IAccessTokenReturn>> {
    const token = await this.authService.issueTokenForLocalSignIn(user);

    return responseForm(token);
  }
}
