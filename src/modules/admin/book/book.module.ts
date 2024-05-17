import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BookController } from './book.controller';
import { BookService } from 'src/shared/services/book/book.service';
import { BookRepository } from 'src/shared/services/book/book.repository';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
