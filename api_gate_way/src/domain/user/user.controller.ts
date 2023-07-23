import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedRoute } from '@nestia/core';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Get()
  async hi() {
    return 1;
  }
}
