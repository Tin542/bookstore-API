import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategorytDto: CreateCategoryDto): Promise<CategoryEntity> {
    const result = await this.categoryRepository.create({
      data: {
        name: createCategorytDto.name,
        description: createCategorytDto.description,
      },
    });
    return plainToInstance(CategoryEntity, result);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const result = await this.categoryRepository.findMany({});
    return plainToInstance(CategoryEntity, result);
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const result = await this.categoryRepository.findOne({ id });
    return plainToInstance(CategoryEntity, result);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const result = await this.categoryRepository.update({
      id: { id },
      data: updateCategoryDto,
    });
    return plainToInstance(CategoryEntity, result);
  }

  async remove(id: string): Promise<CategoryEntity> {
    const result = await this.categoryRepository.delete({id});
    return result;
  }
}
