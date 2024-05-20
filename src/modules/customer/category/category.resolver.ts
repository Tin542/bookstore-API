import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CategoryService } from 'src/shared/services/category/category.service';
import { Category } from 'src/entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  async findAll(): Promise<Category[]> {
    const result = await this.categoryService.findAll();
    return result;
  }

}
