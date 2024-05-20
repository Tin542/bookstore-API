import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Render, Req, Res, Redirect } from '@nestjs/common';

import { CategoryService } from '../../../shared/services/category/category.service';
import { CreateCategoryDto } from '../../../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/category/update-category.dto';
import { Category } from '../../../entities/category.entity';
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
  async findOne(@Param('id') id: string) {
    this.logger.log('Find one Category');
    return 'Find one Category'
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    this.logger.log('Update Category');
    return 'Update Category'
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.logger.log('Delete Category');
    return 'Delete';
  }
}
