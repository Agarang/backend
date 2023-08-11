import { GenerateFetusGRPCOutboundPort } from 'src/ports-adapters/photo/generate-fetus/generate-fetus.grpc.outbound-port';
import { GenerateFetusGRPCOutboundPortOutputDto } from 'src/ports-adapters/photo/generate-fetus/interface/generate-fetus.proto';
import { MockParamTypeForTest } from 'src/utils/types/mock-param-type-for-test.type';

type MockGenerateFetusGRPCParamType =
  MockParamTypeForTest<MockGenerateFetusGRPC>;

export class MockGenerateFetusGRPC implements GenerateFetusGRPCOutboundPort {
  private readonly result: MockGenerateFetusGRPCParamType;

  constructor(result: MockGenerateFetusGRPCParamType) {
    this.result = result;
  }
  async generateFetusImage(
    url: string,
  ): Promise<GenerateFetusGRPCOutboundPortOutputDto> {
    const res = this.result.generateFetusImage?.pop();
    if (res === undefined) {
      throw new Error('undefined');
    }
    return res;
  }
}
