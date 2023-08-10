import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';

export const AZURE_STORAGE_OUTBOUND_PORT =
  'AZURE_STORAGE_OUTBOUND_PORT' as const;

export interface AzureStorageOutboundPort {
  uploadPhoto(
    modifiedProfile: UploadedFileMetadata,
  ): Promise<UploadPhotoOutboundPortOutputDto>;
}
