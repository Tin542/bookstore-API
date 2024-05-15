import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from '../../../entities/category.entity';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiCreatedResponse({ type:  CategoryEntity})
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<ResponseData<CategoryEntity>> {
    this.logger.log('Create Category');
    try {
      const result = await this.categoryService.create(createCategoryDto);
      return new ResponseData<CategoryEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<CategoryEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
  }

  @Get()
  @ApiOkResponse({ type:  CategoryEntity, isArray: true})
  async findAll(): Promise<ResponseData<CategoryEntity[]>> {
    this.logger.log('find all Category');
    try {
      const result = await this.categoryService.findAll();
      return new ResponseData<CategoryEntity[]>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<CategoryEntity[]>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  async findOne(@Param('id') id: string): Promise<ResponseData<CategoryEntity>> {
    this.logger.log('Find one Category');
    try {
      const result = await this.categoryService.findOne(id);
      if(!result){
        return new ResponseData<CategoryEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          result,
        );
      }
      return new ResponseData<CategoryEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<CategoryEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<ResponseData<CategoryEntity>> {
    this.logger.log('Update Category');
    try {
      const author = await this.categoryService.findOne(id);
      if(!author) {
        return new ResponseData<CategoryEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          null,
        );
      }
      const result = await this.categoryService.update(id, updateCategoryDto);
      return new ResponseData<CategoryEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<CategoryEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type:  CategoryEntity})
  async remove(@Param('id') id: string): Promise<ResponseData<CategoryEntity>> {
    this.logger.log('Delete Category');
    try {
      const author = await this.categoryService.findOne(id);
      if(!author) {
        return new ResponseData<CategoryEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          null,
        );
      }
      const result = await this.categoryService.remove(id);
      return new ResponseData<CategoryEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<CategoryEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        null,
      );
    }
  }
}
