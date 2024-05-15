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

import { BookService } from './book.service';
import { BookEntity } from '../../../entities/book.entity';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { FilterBookDto } from './dto/request/fillter-book.dto';
import { ResponseData } from 'src/shared/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/shared/global/globalEnum';
import { ResponseBookDto } from './dto/response/response-book.dto';
import { DetailBookDto } from './dto/response/detail-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  async create(@Body() createBookDto: CreateBookDto): Promise<ResponseData<DetailBookDto>> {
    this.logger.log('Create Book');
    try {
      const result = await this.bookService.create(createBookDto);
      const bookDto = plainToInstance(DetailBookDto, result);
      return new ResponseData<DetailBookDto>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        bookDto,
      );
    } catch (error) {
      return new ResponseData<DetailBookDto>(
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
  @ApiOkResponse({})
  async findOne(@Param('id') id: string): Promise<ResponseData<BookEntity>> {
    this.logger.log('Find one book');
    try {
      const result = await this.bookService.findOne(id);
      if(!result) {
        return new ResponseData<BookEntity>(
          HttpMessage.NOT_FOUND,
          HttpStatus.NOT_FOUND,
          result,
        );  
      }
      return new ResponseData<BookEntity>(
        HttpMessage.SUCCESS,
        HttpStatus.SUCCESS,
        result,
      );
    } catch (error) {
      return new ResponseData (
        HttpMessage.ERROR,
        HttpStatus.ERROR,
        error,
      );
    }
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
