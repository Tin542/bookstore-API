import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { BookController } from './book/book.controller';

@Module({
  imports: [PrismaModule],
  providers: [],
  controllers: [],
})
export class CustomerModule {}
