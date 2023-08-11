export interface GenerateFetusGRPCOutboundPortInputDto {
  url: string;
}

export interface GenerateFetusGRPCOutboundPortOutputDto {
  url: string;
}

export interface IGenerateFetusService {
  generateFetusImage(
    params: GenerateFetusGRPCOutboundPortInputDto,
  ): Promise<GenerateFetusGRPCOutboundPortOutputDto>;
}
