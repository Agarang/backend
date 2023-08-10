import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { Inject, Injectable } from '@nestjs/common';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import {
  AZURE_STORAGE_OUTBOUND_PORT,
  AzureStorageOutboundPort,
} from 'src/ports-adapters/azure/storage/azure.storage.outbound-port';
import {
  PHOTO_REPOSITORY_OUTBOUND_PORT,
  PhotoRepositoryOutboundPort,
} from 'src/ports-adapters/photo/photo.repository.outbound-port';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(PHOTO_REPOSITORY_OUTBOUND_PORT)
    private readonly photoRepository: PhotoRepositoryOutboundPort,

    @Inject(AZURE_STORAGE_OUTBOUND_PORT)
    private readonly azureStorage: AzureStorageOutboundPort,
  ) {}

  async uploadProfilePhoto(
    profile: UploadedFileMetadata,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const { originalname, ...profileInfo } = profile;

    const modifiedProfile = {
      ...profileInfo,
      originalname: `profile-${originalname}-${new Date().toISOString()}`,
    };

    const url = await this.azureStorage.uploadPhoto(modifiedProfile);

    // 저장한 url을 DB 테이블에 저장
    const storageUrl = await this.photoRepository.insertProfilePhotoUrl(
      url.url,
      userId,
    );

    return storageUrl;
  }
}
