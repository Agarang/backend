import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { TypedRoute } from '@nestia/core';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TypedRoute.Post('sign-up')
  async register(@Body() userInfo: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userService.register(userInfo);

    return user;
  }
}
