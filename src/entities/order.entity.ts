
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Order, OrderStatus, PaymentMethod } from '@prisma/client';

@ObjectType()
export class OrderEntity {
  @Field(() => String)
  id: Order['id'];

  @Field(() => Float)
  totalPrice: Order['totalPrice'];

  @Field(() => String)
  userId: Order['userId'];

  @Field(() => OrderStatus)
  status: Order['status'];

  @Field(() => Date, {nullable: true})
  paidAt: Order['paidAt'];

  @Field(() => String)
  address: Order['address'];

  @Field(() => String)
  customerName: Order['customerName'];

  @Field(() => String)
  phoneNumber: Order['phoneNumber'];

  @Field(() => PaymentMethod)
  paymentMethod: Order['paymentMethod'];
}
