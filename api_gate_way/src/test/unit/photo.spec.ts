import { PhotoService } from 'src/domain/photo/photo.service';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import typia from 'typia';
import { MockPhotoRepository } from './mock/photo.repository.mock';
import { MockAzureStorage } from './mock/azure.storage.mock';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { PhotoController } from 'src/domain/photo/photo.controller';
import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { MockGenerateFetusGRPC } from './mock/generate-fetus.grpc.mock';

describe('Photo Spec', () => {
  let user: LocalToken;

  beforeAll(async () => {
    user = typia.random<LocalToken>();
  });

  describe('1. Upload Profile', () => {
    it('1-1. Upload Profile Normally', async () => {
      const url = typia.random<UploadPhotoOutboundPortOutputDto>();
      const profile = typia.random<UploadedFileMetadata>();

      const photoService = new PhotoService(
        new MockPhotoRepository({
          insertProfilePhotoUrl: [url],
        }),
        new MockAzureStorage({ uploadPhoto: [url] }),
        new MockGenerateFetusGRPC({}),
      );

      const photoController = new PhotoController(photoService);

      const res = await photoController.uploadProfilePhoto(
        {
          ...profile,
          buffer: Buffer.alloc(1),
        },
        user,
      );

      expect(res.data).toStrictEqual(url);
    });
  });

  describe('2. Generate Fetus Image', () => {
    it('2-1. Generate Fetus Image Normally', async () => {
      const fetus = typia.random<UploadedFileMetadata>();
      const url = typia.random<UploadPhotoOutboundPortOutputDto>();

      const photoService = new PhotoService(
        new MockPhotoRepository({
          insertFetusPhotoUrl: [url, url],
        }),
        new MockAzureStorage({ uploadPhoto: [url] }),
        new MockGenerateFetusGRPC({
          generateFetusImage: [url],
        }),
      );

      const photoController = new PhotoController(photoService);

      const res = await photoController.createFetusPhoto(
        {
          ...fetus,
          originalname: 'temp.png',
          buffer: Buffer.alloc(1),
        },
        user,
      );

      expect(res.data).toStrictEqual(url);
    });
  });
});
