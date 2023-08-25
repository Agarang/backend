import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { AzureStorageOutboundPort } from 'src/ports-adapters/azure/storage/azure.storage.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockAzureStorageParamType = MockParamTypeForTest<MockAzureStorage>;

export class MockAzureStorage implements AzureStorageOutboundPort {
  private readonly result: MockAzureStorageParamType;

  constructor(result: MockAzureStorageParamType) {
    this.result = result;
  }

  async uploadPhoto(
    modifiedProfile: Express.Multer.File,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const res = this.result.uploadPhoto?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
