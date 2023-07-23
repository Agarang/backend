import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

export function nestiaSwaggerSetUp(app: INestApplication) {
  const docs = fs.readFileSync(
    path.join(__dirname, '../../../swagger.json'),
    'utf-8',
  );

  SwaggerModule.setup('api-docs2', app, JSON.parse(docs));
}
