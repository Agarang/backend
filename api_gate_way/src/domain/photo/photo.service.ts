import { Inject, Injectable } from '@nestjs/common';
import {
  PHOTO_REPOSITORY_OUTBOUND_PORT,
  PhotoRepositoryOutboundPort,
} from 'src/ports-adapters/photo/photo.repository.outbound-port';

@Injectable()
export class PhotoService {
  constructor(
    @Inject(PHOTO_REPOSITORY_OUTBOUND_PORT)
    private readonly photoRepository: PhotoRepositoryOutboundPort,
  ) {}
}
