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
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { FilterBookDto } from './dto/request/fillter-book.dto';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';
import { ResponseBookDto } from './dto/response/response-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  async create(@Body() createBookDto: CreateBookDto) {
    this.logger.log('Create Book');
    try {
      const result = await this.bookService.create(createBookDto);
      return new ResponseData<BookEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<BookEntity>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
  }

  @Get()
  @ApiOkResponse({ isArray: true })
  async findAll(@Query() filter: FilterBookDto): Promise<ResponseData<ResponseBookDto>> {
    this.logger.log('Find all books');
    try {
      const result = await this.bookService.findAll(filter);
      return new ResponseData<ResponseBookDto>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData<ResponseBookDto>(
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
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
