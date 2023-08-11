import { ConflictException, Injectable } from '@nestjs/common';
import { AzureStorageOutboundPort } from './azure.storage.outbound-port';
import {
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';

@Injectable()
export class AzureStorage implements AzureStorageOutboundPort {
  constructor(private readonly azureStorage: AzureStorageService) {}
  async uploadPhoto(
    modifiedProfile: UploadedFileMetadata,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const url = await this.azureStorage.upload(modifiedProfile);

    if (!url) {
      throw new ConflictException('이미지가 저장되지 않았습니다.');
    }

    return { url };
  }
}
