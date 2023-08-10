import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';

export const PHOTO_REPOSITORY_OUTBOUND_PORT =
  'PHOTO_REPOSITORY_OUTBOUND_PORT' as const;

export interface PhotoRepositoryOutboundPort {
  insertProfilePhotoUrl(
    url: string,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto>;
}
