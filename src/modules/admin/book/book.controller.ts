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
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { BookEntity } from '../../../entities/book.entity';
import { CreateBookDto } from '../../../dtos/book/create-book.dto';
import { UpdateBookDto } from '../../../dtos/book/update-book.dto';
import { FilterBookDto } from '../../../dtos/book/fillter-book.dto';
import { DetailBookDto } from '../../../dtos/book/detail-book.dto';
import { BookService } from 'src/shared/services/book/book.service';

@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    this.logger.log('Create Book');
    return 'create book';
  }

  @Get()
  async findAll(@Query() filter: FilterBookDto) {
    this.logger.log('Find all books');
   return 'list book'
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Find one book');
    return 'find one book'
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
