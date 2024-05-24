import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { FilterBookDto } from 'src/dtos/book/fillter-book.dto';
import { ResponseBookDto } from 'src/dtos/book/response-book.dto';
import { AuthorEntity } from 'src/entities/author.entity';
import { BookEntity } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { AuthorService } from 'src/shared/services/author/author.service';
import { BookService } from 'src/shared/services/book/book.service';
import { CategoryService } from 'src/shared/services/category/category.service';

@Resolver(() => BookEntity)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly categoryService: CategoryService,
    private readonly authorService: AuthorService
  ) {}

  @Query(() => ResponseBookDto)
  async findAllBooks(@Args('filter') requestData: FilterBookDto) {
    console.log('Searching', requestData);
    try {
      const result = await this.bookService.findAll(requestData);
      return {
        data: result.list,
        pages: result.totalPages,
        currentPage: result.currentPage,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch books');
    }
  }
  @ResolveField(() => AuthorEntity)
  async author(@Parent() book: BookEntity) {
    const author = await this.authorService.findOne(book.authorId);
    return author.name;  // Adjust based on your author entity structure
  }
}
