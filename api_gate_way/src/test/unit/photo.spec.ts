import { PhotoService } from 'src/domain/photo/photo.service';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import typia from 'typia';
import { MockPhotoRepository } from './mock/photo.repository.mock';
import { MockAzureStorage } from './mock/azure.storage.mock';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { PhotoController } from 'src/domain/photo/photo.controller';
import { UploadedFileMetadata } from '@nestjs/azure-storage';

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
});
