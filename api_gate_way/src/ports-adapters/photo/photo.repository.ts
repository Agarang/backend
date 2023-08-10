import { Injectable } from '@nestjs/common';
import { PhotoRepositoryOutboundPort } from './photo.repository.outbound-port';
import { PrismaService } from 'src/config/database/prisma/prisma.service';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';

@Injectable()
export class PhotoRepository implements PhotoRepositoryOutboundPort {
  constructor(private readonly prisma: PrismaService) {}
  async insertProfilePhotoUrl(
    url: string,
    userId: number,
  ): Promise<UploadPhotoOutboundPortOutputDto> {
    const storageUrl = await this.prisma.profilePhoto.create({
      data: { url, userId },
      select: { url: true },
    });

    return storageUrl;
  }
}
