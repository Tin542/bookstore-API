import { Book, Category } from '@prisma/client';

import { CategoryEntity } from './category.entity';
import { AuthorEntity } from './author.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookEntity implements Book {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  rate: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Boolean)
  isOutofStock: boolean;

  @Field(() => String)
  categoryId: string;

  @Field(() => String)
  authorId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  category?: CategoryEntity;

  authors?: AuthorEntity
}
