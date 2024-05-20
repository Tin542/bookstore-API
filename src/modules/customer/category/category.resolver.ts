import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CategoryService } from 'src/shared/services/category/category.service';
import { CategoryEntity } from 'src/entities/category.entity';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoryEntity, { nullable: false })
  async findAll() {
    return this.categoryService.findAll();
  }

}
