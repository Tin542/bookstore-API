import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Render, Req, Res, Redirect } from '@nestjs/common';

import { CategoryService } from '../../../shared/services/category/category.service';
import { CreateCategoryDto } from '../../../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/category/update-category.dto';
import { CategoryEntity } from '../../../entities/category.entity';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';
import { plainToInstance } from 'class-transformer';

@Controller('admin/category')
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Redirect('category')
  async create(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Create Category');
    try {
      let createData = plainToInstance(CreateCategoryDto, req.body);
      return await this.categoryService.create(createData);
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get()
  @Render('adminPage')
  async findAll() {
    this.logger.log('find all Category');
    try {
      const result = await this.categoryService.findAll();
      return { data: result, module: 'category' };
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get(':id')
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
