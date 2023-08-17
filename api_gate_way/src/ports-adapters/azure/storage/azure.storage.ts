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
    const sasUrl = await this.azureStorage.upload(modifiedProfile);

    if (!sasUrl) {
      throw new ConflictException('이미지가 저장되지 않았습니다.');
    }

    const url = sasUrl.split('?')[0];

    return { url };
  }
}
