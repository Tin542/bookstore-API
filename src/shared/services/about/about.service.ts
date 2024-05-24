import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AboutRepository } from './about.repository';
import { AboutEntity } from 'src/entities/about.entity';
import { UpdateAboutDto } from 'src/dtos/about/update-about.dto';
;

@Injectable()
export class AboutService {
  constructor(private aboutRepository: AboutRepository) {}

  async findOne(id: string) {
    const result = await this.aboutRepository.findOne({ id: id });
    return plainToInstance(AboutEntity, result);
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    const result = await this.aboutRepository.update({
      id: { id },
      data: updateAboutDto,
    });
    return plainToInstance(AboutEntity, result);
  }

}
