import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/user/user.repository.outbound-port';
import { UserRepository } from 'src/ports-adapters/user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    UserService,
  ],
})
export class UserModule {}
