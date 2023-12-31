import { PhotoService } from 'src/domain/photo/photo.service';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import typia from 'typia';
import { MockPhotoRepository } from './mock/photo.repository.mock';
import { MockAzureStorage } from './mock/azure.storage.mock';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { PhotoController } from 'src/domain/photo/photo.controller';
import { MockGenerateFetusGRPC } from './mock/generate-fetus.grpc.mock';
import { MockUserRepository } from './mock/user.repository.mock';
import { FindUserInfoOutboundPortOutputDto } from 'src/dtos/user/find-user-info.dto';
import { Readable } from 'stream';

describe('Photo Spec', () => {
  let user: LocalToken;

  beforeAll(async () => {
    user = typia.random<LocalToken>();
  });

  describe('1. Upload Profile', () => {
    it('1-1. Upload Profile Normally', async () => {
      const url = typia.random<UploadPhotoOutboundPortOutputDto>();
      const profile = typia.random<Express.Multer.File>();
      const updatedUserInfo = typia.random<FindUserInfoOutboundPortOutputDto>();

      const photoService = new PhotoService(
        new MockPhotoRepository({
          insertProfilePhotoUrl: [url],
        }),
        new MockUserRepository({
          updateUserInfo: [updatedUserInfo],
        }),
        new MockAzureStorage({ uploadPhoto: [url] }),
        new MockGenerateFetusGRPC({}),
      );

      const photoController = new PhotoController(photoService);

      const res = await photoController.uploadProfilePhoto(
        {
          ...profile,
          originalname: 'temp.png',
          buffer: Buffer.alloc(1),
          stream: new Readable(),
        },
        user,
      );

      expect(res.data).toStrictEqual(url);
    });
  });

  describe('2. Generate Fetus Image', () => {
    it('2-1. Generate Fetus Image Normally', async () => {
      const fetus = typia.random<Express.Multer.File>();
      const url = typia.random<UploadPhotoOutboundPortOutputDto>();

      const photoService = new PhotoService(
        new MockPhotoRepository({
          insertFetusPhotoUrl: [url, url],
        }),
        new MockUserRepository({}),
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
          stream: new Readable(),
        },
        user,
      );

      expect(res.data).toStrictEqual(url);
    });
  });
});
