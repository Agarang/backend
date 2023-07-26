import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/middlewares/decorators/user.decorator';
import { TypedBody, TypedRoute } from '@nestia/core';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessTokenReturn, LocalToken } from 'src/dtos/auth/local-token.dto';
import { LogInUserDto } from 'src/dtos/user/login-user.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @TypedRoute.Post('sign-in')
  async localSignIn(
    @User() user: LocalToken,
    @TypedBody() body: LogInUserDto,
  ): Promise<AccessTokenReturn> {
    const token = await this.authService.issueTokenForLocalSignIn(user);

    return token;
  }
}
