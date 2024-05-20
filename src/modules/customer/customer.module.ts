import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { PrismaModule } from '../../shared/prisma/prisma.module';
import { CategoryResolver } from './category/category.resolver';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ request: req }),
    }),
    PrismaModule,
    CategoryModule
  ],
  providers: [CategoryResolver],
  controllers: [],
})
export class CustomerModule {}
