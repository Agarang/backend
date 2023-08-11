import { UserService } from 'src/domain/user/user.service';
import { MockUserRepository } from './mock/user.repository.mock';
import { UserController } from 'src/domain/user/user.controller';
import typia from 'typia';
import {
  CreateUserDto,
  CreateUserOutboundPortOutputDto,
} from 'src/dtos/user/create-user.dto';
import { UserEntity } from 'src/config/database/models/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import {
  UpdateUserEmailOutboundPortOutputDto,
  UpdateUserEtcInfoInboundPortInputDto,
  UpdateUserNicknameOutboundPortOutputDto,
  UpdateUserPasswordInboundPortInputDto,
  UpdateUserPasswordOutboundPortOutputDto,
  UpdateUserPhoneNumberInboundPortInputDto,
} from 'src/dtos/user/update-user.dto';
import { DeleteUserOutboundPortOutputDto } from 'src/dtos/user/delete-user.dto';

describe('User Spec', () => {
  let user: LocalToken;

  beforeAll(async () => {
    user = typia.random<LocalToken>();
  });

  describe('1. Register User', () => {
    it('1-1. Sign up', async () => {
      const userInfo = typia.random<CreateUserOutboundPortOutputDto>();

      const userService = new UserService(
        new MockUserRepository({
          findUserForSignUp: [null],
          insertUser: [userInfo],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.register({
        ...userInfo,
        passwordConfirm: userInfo.password,
      });

      expect(res.data).toStrictEqual(userInfo);
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
          ...user,
        },
        {
          email: user.email,
          password: user.password,
        },
      );

      expect(res.data.accessToken).toBeDefined();
    });
  });

  describe('3. User Info', () => {
    it('3-1. Get Own User Info', async () => {
      const userInfo = typia.random<FindUserInfoOutboundPortOutputDto>();

      const userService = new UserService(
        new MockUserRepository({
          findUserInfo: [userInfo],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.getOwnUserInfo(user);

      expect(res.data).toStrictEqual(userInfo);
    });

    it('3-2. Update User Etc Info', async () => {
      const userInfo = typia.random<FindUserInfoOutboundPortOutputDto>();
      const data = typia.random<UpdateUserEtcInfoInboundPortInputDto>();

      const userService = new UserService(
        new MockUserRepository({
          updateUserInfo: [userInfo],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.modifyUserEtcInfo(user, data);

      expect(res.data).toStrictEqual(userInfo);
    });

    it('3-3. Update User Phone Number', async () => {
      const phoneNumber =
        typia.random<UpdateUserPhoneNumberInboundPortInputDto>();

      const userService = new UserService(
        new MockUserRepository({
          updatePhoneNumber: [phoneNumber],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.modifyPhoneNumber(user, phoneNumber);

      expect(res.data).toStrictEqual(phoneNumber);
    });

    it('3-4. Update User Nickname', async () => {
      const nickname = typia.random<UpdateUserNicknameOutboundPortOutputDto>();

      const userService = new UserService(
        new MockUserRepository({
          updateNickname: [nickname],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.modifyNickname(user, nickname);

      expect(res.data).toStrictEqual(nickname);
    });

    it('3-5. Update User Email', async () => {
      const email = typia.random<UpdateUserEmailOutboundPortOutputDto>();

      const userService = new UserService(
        new MockUserRepository({
          updateEmail: [email],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.modifyEmail(user, email);

      expect(res.data).toStrictEqual(email);
    });

    it('3-6. Update User Password', async () => {
      const userInfo = typia.random<UpdateUserPasswordOutboundPortOutputDto>();

      const passwordPair =
        typia.random<UpdateUserPasswordInboundPortInputDto>();

      const userService = new UserService(
        new MockUserRepository({
          updatePassword: [userInfo],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.modifyPassword(user, passwordPair);

      expect(res.data).toStrictEqual(userInfo);
    });
  });

  describe('4. Unregister User', () => {
    it('4-1. Unregister User', async () => {
      const deletedUser = typia.random<DeleteUserOutboundPortOutputDto>();

      const userService = new UserService(
        new MockUserRepository({
          deleteUser: [deletedUser],
        }),
      );

      const userController = new UserController(userService);

      const res = await userController.unregister(user);

      expect(res.data).toStrictEqual(deletedUser);
    });
  });
});
