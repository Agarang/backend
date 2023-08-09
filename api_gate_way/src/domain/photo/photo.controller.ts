import { Controller } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('api/v1/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}
}
