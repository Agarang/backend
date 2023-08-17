import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { Inject, Injectable } from '@nestjs/common';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import {
  AZURE_STORAGE_OUTBOUND_PORT,
  AzureStorageOutboundPort,
} from 'src/ports-adapters/azure/storage/azure.storage.outbound-port';
import {
  GENERATE_FETUS_GRPC_OUTBOUND_PORT,
  GenerateFetusGRPCOutboundPort,
} from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc.outbound-port';
import {
  PHOTO_REPOSITORY_OUTBOUND_PORT,
  PhotoRepositoryOutboundPort,
} from 'src/ports-adapters/photo/photo.repository.outbound-port';
import {
  USER_REPOSITORY_OUTBOUND_PORT,
  UserRepositoryOutboundPort,
} from 'src/ports-adapters/user/user.repository.outbound-port';
import { modifyFileName } from 'src/utils/functions/modify-file-name.function';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(PHOTO_REPOSITORY_OUTBOUND_PORT)
    private readonly photoRepository: PhotoRepositoryOutboundPort,

    @Inject(USER_REPOSITORY_OUTBOUND_PORT)
    private readonly userRepository: UserRepositoryOutboundPort,

    @Inject(AZURE_STORAGE_OUTBOUND_PORT)
    private readonly azureStorage: AzureStorageOutboundPort,

    @Inject(GENERATE_FETUS_GRPC_OUTBOUND_PORT)
    private readonly generateFetusGrpc: GenerateFetusGRPCOutboundPort,
  ) {}

  async generateFetusPhoto(
    fetus: UploadedFileMetadata,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    // 1. Azure blob storage에 입체 초음파 사진 저장
    const modifiedFile = modifyFileName(fetus, 'original-fetus');

    const originPhotoUrl = await this.azureStorage.uploadPhoto(modifiedFile);

    // 2. 원본사진 url을 RDB 테이블에 저장
    const storedOriginPhotoUrl = await this.photoRepository.insertFetusPhotoUrl(
      originPhotoUrl.url,
      userId,
    );

    // 3. 해당 입체 초음파 사진의 url을 gRPC서버에 전달
    const generatedFetusImageUrl =
      await this.generateFetusGrpc.generateFetusImage({
        url: storedOriginPhotoUrl.url,
        filename: fetus.originalname,
        ext: modifiedFile.originalname.split('.').slice(-1).toString(),
      });

    // 4. gRPC 서버에서 생후 사진 생성 후, Azure blob storage에 저장

    // 5. 그리고 gRPC서버에서는 생후 사진을 저장한 url을 nest.js서버로 전달

    // 6. nest서버에서 해당 url을 RDB테이블에 저장
    const url = await this.photoRepository.insertFetusPhotoUrl(
      generatedFetusImageUrl.url,
      userId,
    );

    return url;
  }

  async uploadProfilePhoto(
    profile: UploadedFileMetadata,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const modifiedProfile = modifyFileName(profile, 'profile');

    const url = await this.azureStorage.uploadPhoto(modifiedProfile);

    // 저장한 url을 DB 테이블에 저장
    const storageUrl = await this.photoRepository.insertProfilePhotoUrl(
      url.url,
      userId,
    );

    // 저장한 url을 User의 profileUrl에 저장
    const user = await this.userRepository.updateUserInfo(userId, {
      profilePhotoUrl: storageUrl.url,
    });

    return storageUrl;
  }
}
