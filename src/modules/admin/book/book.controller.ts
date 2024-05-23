import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  Req,
  Res,
  Render,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BookEntity } from '../../../entities/book.entity';
import { CreateBookDto } from '../../../dtos/book/create-book.dto';
import { UpdateBookDto } from '../../../dtos/book/update-book.dto';
import { FilterBookDto } from '../../../dtos/book/fillter-book.dto';
import { DetailBookDto } from '../../../dtos/book/detail-book.dto';
import { BookService } from 'src/shared/services/book/book.service';
import { Request, Response } from 'express';
import { CategoryService } from 'src/shared/services/category/category.service';
import { AuthorService } from 'src/shared/services/author/author.service';

@Controller('admin/book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(
    private readonly bookService: BookService,
    private readonly categoryService: CategoryService,
    private readonly authorService: AuthorService,
  ) {}

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Create book');
    try {
      let createData = plainToInstance(CreateBookDto, req.body);
      await this.bookService.create(createData);
      return res.redirect('/admin/book');
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get()
  @Render('adminPage')
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    this.logger.log('Find all books');
    try {
      let requestData = req.query;
      let filter = plainToInstance(FilterBookDto, {
        title: requestData.title || '',
        rate: requestData.rate ? parseInt(requestData.rate as string) : undefined,
        author: requestData.author ? [requestData.author] : [],
        category: requestData.category ? [requestData.category] : [],
        page: page ? page : 1,
        limit: limit ? limit : 5,
      });
      const [result, listcategory, listAuthor] = await Promise.all([
        this.bookService.findAll(filter),
        this.categoryService.findAllForFilter(),
        this.authorService.findAllForFilter(),
      ]);
      return {
        module: 'book',
        data: result.list,
        pages: result.totalPages,
        currentPage: page,
        listCategories: listcategory,
        listAuthor: listAuthor,
        filters: filter,
      };
    } catch (error) {
      return { errMessage: error };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Find one book');
    return 'find one book';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    this.logger.log('Update one book');
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
