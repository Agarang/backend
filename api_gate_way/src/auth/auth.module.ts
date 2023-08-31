import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/user/user.repository.outbound-port';
import { UserRepository } from 'src/ports-adapters/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtLocalStrategy } from './strategies/jwt-local.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_LOCAL_SECRET'),
          signOptions: { expiresIn: '30m', algorithm: 'HS256' },
        };
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    AuthService,
    JwtLocalStrategy,
    LocalStrategy,
  ],
})
export class AuthModule {}
