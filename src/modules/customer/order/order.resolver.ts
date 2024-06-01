import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateOrderDto } from 'src/dtos/order/create-order.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { OrderService } from 'src/shared/services/order/order.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OrderEntity)
  async createOrder(@Args() data: CreateOrderDto): Promise<OrderEntity> {
    const result = this.orderService.create(data);
    return result;
  }

}
