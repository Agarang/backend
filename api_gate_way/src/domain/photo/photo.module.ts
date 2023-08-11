import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { PhotoRepository } from 'src/ports-adapters/photo/photo.repository';
import { PHOTO_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/photo/photo.repository.outbound-port';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { ConfigService } from '@nestjs/config';
import { AZURE_STORAGE_OUTBOUND_PORT } from 'src/ports-adapters/azure/storage/azure.storage.outbound-port';
import { AzureStorage } from 'src/ports-adapters/azure/storage/azure.storage';
import { GENERATE_FETUS_GRPC_OUTBOUND_PORT } from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc.outbound-port';
import { GenerateFetusGRPC } from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc';

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
    {
      provide: AZURE_STORAGE_OUTBOUND_PORT,
      useClass: AzureStorage,
    },
    {
      provide: GENERATE_FETUS_GRPC_OUTBOUND_PORT,
      useClass: GenerateFetusGRPC,
    },
    PhotoService,
  ],
})
export class PhotoModule {}
