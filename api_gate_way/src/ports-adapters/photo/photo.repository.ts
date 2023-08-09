import { Injectable } from '@nestjs/common';
import { PhotoRepositoryOutboundPort } from './photo.repository.outbound-port';
import { PrismaService } from 'src/config/database/prisma/prisma.service';

@Injectable()
export class PhotoRepository implements PhotoRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}
}
