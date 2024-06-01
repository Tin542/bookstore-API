import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from 'src/dtos/order/create-order.dto';
import { OrderEntity } from 'src/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(createOrderDTO: CreateOrderDto): Promise<OrderEntity> {
    const result = await this.orderRepository.createOrder({
      data: {
        totalPrice: createOrderDTO.totalPrice,
        user: {
          connect: {
            id: createOrderDTO.userId,
          },
        },
        OrderDetail: {
          create: createOrderDTO.book.map((item) => ({
            book: {
              connect: {
                id: item.id,
              },
            },
          })),
        },

        status: createOrderDTO.status,
        paymentMethod: createOrderDTO.paymentMethod,
        paidAt: createOrderDTO.paidAt,
        customerName: createOrderDTO.customerName,
        phoneNumber: createOrderDTO.phoneNumber,
        address: createOrderDTO.address,
      },
    });
    return plainToInstance(OrderEntity, result);
  }

//   async findAll(uid: string): Promise<CartItemEntity[]> {
//     const result = await this.cartRepository.findMany({
//       where: {
//         userId: uid,
//       },
//       orderBy: {
//         createdAt: Prisma.SortOrder.desc,
//       },
//     });
//     return plainToInstance(CartItemEntity, result);
//   }

//   async findOne(id: string): Promise<CartItemEntity> {
//     const result = await this.cartRepository.findOne({ id });
//     return plainToInstance(CartItemEntity, result);
//   }
}
