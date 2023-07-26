import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { LocalToken } from 'src/dtos/auth/local-token.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<LocalToken> {
    const user = await this.authService.validateUser(email, password);

    return user;
  }
}
