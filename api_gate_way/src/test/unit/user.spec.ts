import { UserService } from 'src/domain/user/user.service';
import { MockUserRepository } from './mock/user.repository.mock';
import { UserController } from 'src/domain/user/user.controller';
import typia from 'typia';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';

describe('User Spec', () => {
  describe('1. Register User', () => {
    it('1-1. Sign up', async () => {
      const userInfo = typia.random<CreateUserDto>();

      const userService = new UserService(new MockUserRepository({}));

      const userController = new UserController(userService);

      const res = await userController.register(userInfo);

      expect(res).toStrictEqual(userInfo);
    });
  });
});
