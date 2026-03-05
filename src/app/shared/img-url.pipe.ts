import { Pipe, PipeTransform } from '@angular/core';
import { ImageService } from './image.service';

@Pipe({ name: 'imgUrl', standalone: true })
export class ImgUrlPipe implements PipeTransform {
  constructor(private img: ImageService) {}

  transform(ref: string, w?: number, h?: number, crop: any = 'fit') {
    return this.img.url(ref, {
      w,
      h,
      crop,
      quality: 'auto',
      format: 'auto'
    });
  }
}
