import { Category as categoryDB } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import moment from 'moment';
@ObjectType()
export class Category {
  @Field(() => String)
  id: categoryDB["id"];

  @Field(() => String)
  name: categoryDB["name"];

  @Field(() => String)
  description: categoryDB["description"];

  @Field(() => Boolean)
  isActive: categoryDB["isActive"];

  @Field(() => Date)
  createdAt: categoryDB["createdAt"];

  // @Transform(updatedAt => moment(updatedAt).format('DD/MM/YY'))
  @Field(() => Date)
  updatedAt: categoryDB["updatedAt"];
}
