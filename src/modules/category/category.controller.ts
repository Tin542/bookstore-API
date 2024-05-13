import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from '../../entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({ type:  CategoryEntity})
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    this.logger.log('Create Category');
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type:  CategoryEntity, isArray: true})
  findAll() {
    this.logger.log('find all Category');
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  findOne(@Param('id') id: string) {
    this.logger.log('Find one Category');
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.logger.log('Update Category');
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  remove(@Param('id') id: string) {
    this.logger.log('Delete Category');
    return this.categoryService.remove(id);
  }
}
