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

import { BookService } from './book.service';
import { BookEntity } from '../../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FillterBookDto } from './dto/fillter-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  create(@Body() createBookDto: CreateBookDto) {
    this.logger.log('Create Book');
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false })
  findAll(@Query() book: FillterBookDto, page: number, limit: number, sort: string) {
    this.logger.log('Find all books');
    return this.bookService.findAll(book, page, limit, sort);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  findOne(@Param('id') id: string) {
    this.logger.log('Find one book');
    return this.bookService.findOne(id);
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
