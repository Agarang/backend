import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PrismaModule } from 'src/config/database/prisma/prisma.module';
import { PhotoRepository } from 'src/ports-adapters/photo/photo.repository';
import { PHOTO_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/photo/photo.repository.outbound-port';
import { ConfigService } from '@nestjs/config';
import { AZURE_STORAGE_OUTBOUND_PORT } from 'src/ports-adapters/azure/storage/azure.storage.outbound-port';
import { AzureStorage } from 'src/ports-adapters/azure/storage/azure.storage';
import { GENERATE_FETUS_GRPC_OUTBOUND_PORT } from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc.outbound-port';
import { GenerateFetusGRPC } from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/user/user.repository.outbound-port';
import { UserRepository } from 'src/ports-adapters/user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PhotoController],
  providers: [
    {
      provide: PHOTO_REPOSITORY_OUTBOUND_PORT,
      useClass: PhotoRepository,
    },
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
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
