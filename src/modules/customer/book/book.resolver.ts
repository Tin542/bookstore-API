import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { FilterBookDto } from 'src/dtos/book/filter-book.dto';
import { ResponseBookDto } from 'src/dtos/book/response-book.dto';
import { BookEntity } from 'src/entities/book.entity';
import { BookService } from 'src/shared/services/book/book.service';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  //BAD PRACTICE
  @Query(() => ResponseBookDto)
  async findAllBooks(
    @Args('title', { nullable: true }) title?: string,
    @Args('rate', { nullable: true, type: () => Int }) rate?: number,
    @Args('author', { nullable: true, type: () => [String] }) author?: string[],
    @Args('category', { nullable: true, type: () => [String] }) category?: string[],
    @Args('page', { nullable: true, type: () => Int, defaultValue: 1} ) page?: number,
    @Args('limit', { nullable: true, type: () => Int, defaultValue: 12 }) limit?: number
  ) {
    try {
      let filter = plainToInstance(FilterBookDto, {
        title,
        rate,
        author,
        category,
        page,
        limit
      });
      const result = await this.bookService.findAll(filter);
      const response = plainToInstance(ResponseBookDto, result);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch books');
    }
  }
}

// @Query(() => ResponseBookDto)
//   async findAllBooks(@Args() filter: getBookArgs) {
//     console.log('Searching', filter);
//     try {
//       const result = await this.bookService.findAllForCustomer(filter);
//       const response = plainToInstance(ResponseBookDto, result);
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Failed to fetch books');
//     }
//   }
// }
