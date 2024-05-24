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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ request: req }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2days' },
    }),
    PrismaModule,
    CategoryModule,
    AuthorModule,
    BookModule
  ],
  providers: [CategoryResolver, AuthorResolver, BookResolver],
  exports: [CategoryResolver, AuthorResolver, BookResolver]
})
export class CustomerModule {}
