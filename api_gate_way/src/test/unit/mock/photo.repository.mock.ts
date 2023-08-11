import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { PhotoRepositoryOutboundPort } from 'src/ports-adapters/photo/photo.repository.outbound-port';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockPhotoRepositoryParamType = MockParamTypeForTest<MockPhotoRepository>;

export class MockPhotoRepository implements PhotoRepositoryOutboundPort {
  private readonly result: MockPhotoRepositoryParamType;

  constructor(result: MockPhotoRepositoryParamType) {
    this.result = result;
  }

  async insertProfilePhotoUrl(
    url: string,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const res = this.result.insertProfilePhotoUrl?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }

  async insertFetusPhotoUrl(
    url: string,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const res = this.result.insertFetusPhotoUrl?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
