import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { PhotoRepository } from 'src/ports-adapters/photo/photo.repository';
import { PHOTO_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/photo/photo.repository.outbound-port';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AzureStorageModule.withConfigAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          sasKey: configService.get('AZURE_STORAGE_SAS_KEY')!,
          accountName: configService.get('AZURE_STORAGE_ACCOUNT')!,
          containerName: configService.get('AZURE_BLOB_STORAGE_CONTAINER')!,
        };
      },
    }),
    PrismaModule,
  ],
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
