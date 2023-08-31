import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { AzureStorageOutboundPort } from './azure.storage.outbound-port';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable()
export class AzureStorage implements AzureStorageOutboundPort, OnModuleInit {
  private blobServiceClient: BlobServiceClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const connectString = this.configService.get(
      'AZURE_STORAGE_CONNECTION_STRING',
    );

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectString);
  }

  async uploadPhoto(
    modifiedProfile: Express.Multer.File,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const fileName = modifiedProfile.originalname;

    const containerClient = this.blobServiceClient.getContainerClient(
      this.configService.get('AZURE_BLOB_STORAGE_CONTAINER')!,
    );

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    const url = blockBlobClient.url;

    const uploadBlobResponse = await blockBlobClient.upload(
      modifiedProfile.buffer,
      modifiedProfile.size,
    );

    if (uploadBlobResponse.errorCode) {
      throw new ConflictException('이미지가 저장되지 않았습니다.');
    }

    return { url };
  }
}
