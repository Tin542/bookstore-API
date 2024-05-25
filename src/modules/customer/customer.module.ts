import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CategoryResolver } from './category/category.resolver';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { AuthorResolver } from './author/author.resolver';
import { BookModule } from './book/book.module';
import { BookResolver } from './book/book.resolver';
import { AboutModule } from './about/about.module';
import { AboutResolver } from './about/about.resolver';
import { BookService } from 'src/shared/services/book/book.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2days' },
    }),
    PrismaModule,
    CategoryModule,
    AuthorModule,
    BookModule,
    AboutModule
  ],
  providers: [CategoryResolver, AuthorResolver, BookResolver, AboutResolver, BookService],
})
export class CustomerModule {}
