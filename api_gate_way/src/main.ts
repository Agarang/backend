import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { swaggerSetUp } from './config/swagger/init.swagger';
import { nestiaSwaggerSetUp } from './config/swagger/nestia.swagger-init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = await configService.get('NEST_PORT');

  swaggerSetUp(app);
  nestiaSwaggerSetUp(app);

  app.enableCors();

  await app.listen(port);
}
bootstrap();
