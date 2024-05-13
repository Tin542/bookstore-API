import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './author.repository';
import { plainToInstance } from 'class-transformer';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService {

  constructor(private authorRepository: AuthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const result = await this.authorRepository.create({data: createAuthorDto});
    return plainToInstance(AuthorEntity, result);
  }

  async findAll() {
    const result = await this.authorRepository.findMany({});
    return plainToInstance(AuthorEntity, result);
  }

  async findOne(id: string) {
    const result = await this.authorRepository.findOne({id: id});
    return plainToInstance(AuthorEntity, result);
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const result = await this.authorRepository.update({id: {id}, data: updateAuthorDto});
    return plainToInstance(AuthorEntity, result);
  }

  async remove(id: string) {
    const result = await this.authorRepository.delete({id});
    return plainToInstance(AuthorEntity, result);
  }
}
