import { Category } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import moment from 'moment';
@ObjectType()
export class CategoryEntity implements Category {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  // @Transform(updatedAt => moment(updatedAt).format('DD/MM/YY'))
  @Field(() => Date)
  updatedAt: Date;
}
