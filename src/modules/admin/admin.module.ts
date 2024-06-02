import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, BookModule, CategoryModule, AuthorModule, UserModule, OrderModule],
  providers: [],
  controllers: [],
})
export class AdminModule {}
