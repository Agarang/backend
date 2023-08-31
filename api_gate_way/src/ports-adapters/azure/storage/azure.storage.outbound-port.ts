import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';

export const AZURE_STORAGE_OUTBOUND_PORT =
  'AZURE_STORAGE_OUTBOUND_PORT' as const;

export interface AzureStorageOutboundPort {
  uploadPhoto(
    modifiedProfile: Express.Multer.File,
  ): Promise<UploadPhotoOutboundPortOutputDto>;
}
