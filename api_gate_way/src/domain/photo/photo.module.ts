import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { PhotoRepository } from 'src/ports-adapters/photo/photo.repository';
import { PHOTO_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/photo/photo.repository.outbound-port';

@Module({
  imports: [PrismaModule],
  controllers: [PhotoController],
  providers: [
    {
      provide: PHOTO_REPOSITORY_OUTBOUND_PORT,
      useClass: PhotoRepository,
    },
    PhotoService,
  ],
})
export class PhotoModule {}
