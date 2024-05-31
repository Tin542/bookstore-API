import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, BookModule, CategoryModule, AuthorModule, UserModule],
  providers: [],
  controllers: [],
})
export class AdminModule {}
