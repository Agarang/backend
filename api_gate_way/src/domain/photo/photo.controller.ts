import {
  Controller,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { TypedRoute } from '@nestia/core';
import { JwtLocalGuard } from 'src/auth/guards/jwt-local.guard';
import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ResponseForm,
  responseForm,
} from 'src/middlewares/interceptors/transform.interceptor';
import { UploadPhotoOutboundPortOutputDto } from 'src/dtos/photo/upload-profile-photo.dto';
import { User } from 'src/middlewares/decorators/user.decorator';
import { LocalToken } from 'src/dtos/auth/local-token.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('/api/v1/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtLocalGuard)
  @UseInterceptors(FileInterceptor('fetus'))
  @TypedRoute.Post('fetus')
  async createFetusPhoto(
    @UploadedFile() fetus: UploadedFileMetadata,
    @User() user: LocalToken,
  ): Promise<ResponseForm<UploadPhotoOutboundPortOutputDto>> {
    const storageUrl = await this.photoService.generateFetusPhoto(
      fetus,
      user.id,
    );

    return responseForm(storageUrl);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtLocalGuard)
  @UseInterceptors(FileInterceptor('profile'))
  @TypedRoute.Put('profile')
  async uploadProfilePhoto(
    @UploadedFile() profile: UploadedFileMetadata,
    @User() user: LocalToken,
  ): Promise<ResponseForm<UploadPhotoOutboundPortOutputDto>> {
    const storageUrl = await this.photoService.uploadProfilePhoto(
      profile,
      user.id,
    );

    return responseForm(storageUrl);
  }
}
