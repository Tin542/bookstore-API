import { Resolver, Query, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { FilterBookDto } from 'src/dtos/book/filter-book.dto';
import { ResponseBookDto } from 'src/dtos/book/response-book.dto';
import { BookEntity } from 'src/entities/book.entity';
import { BookService } from 'src/shared/services/book/book.service';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
  ) {}

  @Query(() => ResponseBookDto)
  async findAllBooks(@Args('filter') filter: FilterBookDto) {
    console.log('Searching', filter);
    try {
      const result = await this.bookService.findAll(filter);
      const response = plainToInstance(ResponseBookDto, result);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch books');
    }
  }
}
