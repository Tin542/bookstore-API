import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BookRepository } from 'src/shared/services/book/book.repository';
import { BookService } from 'src/shared/services/book/book.service';
import { BookResolver } from './book.resolver';
import { CategoryService } from 'src/shared/services/category/category.service';
import { CategoryRepository } from 'src/shared/services/category/category.repository';
import { AuthorService } from 'src/shared/services/author/author.service';
import { AuthorRepository } from 'src/shared/services/author/author.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    BookResolver,
    BookService,
    BookRepository,
    CategoryService,
    CategoryRepository,
    AuthorService,
    AuthorRepository,
  ],
  exports: [BookRepository, BookService],
})
export class BookModule {}
