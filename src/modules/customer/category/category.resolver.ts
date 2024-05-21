import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CategoryService } from 'src/shared/services/category/category.service';
import { Category } from 'src/entities/category.entity';
import { FilterCategoryDto } from 'src/dtos/category/filter-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  async findAll(filter: FilterCategoryDto) {
    const result = await this.categoryService.findAll(filter);
    return result;
  }

}
