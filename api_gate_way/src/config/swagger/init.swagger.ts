import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetUp(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Project Title')
    .setDescription('SKT FLY AI Hackathon Project')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
}
