import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [PrismaModule, BookModule, CategoryModule, AuthorModule],
  providers: [],
})
export class AppModule {}
