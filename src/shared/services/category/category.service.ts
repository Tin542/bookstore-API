import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateCategoryDto } from '../../../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/category/update-category.dto';
import { CategoryRepository } from './category.repository';
import { Category } from '../../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategorytDto: CreateCategoryDto): Promise<Category> {
    const result = await this.categoryRepository.create({
      data: {
        name: createCategorytDto.name,
        description: createCategorytDto.description,
      },
    });
    return plainToInstance(Category, result);
  }

  async findAll(): Promise<Category[]>  {
    const result = await this.categoryRepository.findMany({});
    return result;
  }

  async findOne(id: string): Promise<Category> {
    const result = await this.categoryRepository.findOne({ id });
    return plainToInstance(Category, result);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const result = await this.categoryRepository.update({
      id: { id },
      data: updateCategoryDto,
    });
    return plainToInstance(Category, result);
  }

  async remove(id: string): Promise<Category> {
    const result = await this.categoryRepository.delete({id});
    return result;
  }
}
