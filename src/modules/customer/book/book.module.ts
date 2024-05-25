import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BookRepository } from 'src/shared/services/book/book.repository';
import { BookService } from 'src/shared/services/book/book.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [PrismaModule],
  providers: [BookResolver, BookService, BookRepository],
  exports: [BookRepository, BookService],
})
export class BookModule {}
