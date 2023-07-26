import { UserService } from 'src/domain/user/user.service';
import { MockUserRepository } from './mock/user.repository.mock';
import { UserController } from 'src/domain/user/user.controller';
import typia from 'typia';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserEntity } from 'src/config/database/models/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';

describe('User Spec', () => {
  describe('1. Register User', () => {
    it('1-1. Sign up', async () => {
      const userInfo = typia.random<CreateUserDto>();

      const userService = new UserService(
        new MockUserRepository({
          findUserForSignUp: [null],
          insertUser: [userInfo],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.register(userInfo);

      expect(res).toStrictEqual(userInfo);
    });
  });

  describe('2. Sign In User', () => {
    it('2-1. Local Sign In', async () => {
      const user = typia.random<UserEntity>();

      const authService = new AuthService(
        new MockUserRepository({
          findUserForSignUp: [user],
        }),
        new JwtService({
          secret: 'secret',
        }),
      );

      const authController = new AuthController(authService);

      const res = await authController.localSignIn(
        {
          email: user.email,
          id: user.id,
          nickname: user.nickname,
        },
        {
          email: user.email,
          password: user.password,
        },
      );

      expect(res.accessToken).toBeDefined();
    });
  });
});
