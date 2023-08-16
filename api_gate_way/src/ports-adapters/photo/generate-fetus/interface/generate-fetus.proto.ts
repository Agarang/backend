import { Observable } from 'rxjs';

export interface GenerateFetusGRPCOutboundPortInputDto {
  url: string;
  filename: string;
  ext: string;
}

export interface GenerateFetusGRPCOutboundPortOutputDto {
  url: string;
}

export interface IGenerateFetusService {
  generateFetusImage(
    params: GenerateFetusGRPCOutboundPortInputDto,
  ): Observable<GenerateFetusGRPCOutboundPortOutputDto>;
}
