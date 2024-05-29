import { CartItem, Category as categoryDB } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';

@ObjectType()
export class CartEntity {
  @Field(() => String)
  id: CartItem['id'];

  @Field(() => [String])
  bookId: CartItem['bookId'];

  @Field(() => Number)
  quantity: CartItem['quantity'];

  @Field(() => Date)
  createdAt: CartItem['createdAt'];

  @Field(() => Date)
  updatedAt: CartItem['updatedAt'];

  @Field(() => String)
  userId: CartItem['userId'];

  @Field(() => Number)
  price: CartItem['price'];
}
