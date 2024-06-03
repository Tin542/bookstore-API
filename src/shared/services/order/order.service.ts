import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from 'src/dtos/order/create-order.dto';
import { OrderEntity } from 'src/entities/order.entity';
import { FilterOrderkDto } from 'src/dtos/order/filter-order.dto';

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
          create: createOrderDTO.orderItem.map((item) => ({
            book: {
              connect: {
                id: item.bookId
              }
            },
            quantity: item.quantity,
            price: item.price
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

  async findAll(filter: FilterOrderkDto) {
    const itemPerPage: number = filter.limit || 5;
    const offset: number =
      filter.page && filter.page > 0 ? (filter.page - 1) * itemPerPage : 0;
    const currentPage: number = filter.page || 1;

    const whereCondition: any = {
      AND: [],
    };

    if (filter.id) {
      whereCondition.AND.push({ id: filter.id });
    }

    if (filter.status) {
      whereCondition.AND.push({ status: filter.status });
    }

    if (filter.isPaid !== undefined) {
      whereCondition.AND.push({
        paidAt: filter.isPaid ? { not: null } : null,
      });
    }

    const [list, total] = await Promise.all([
      this.orderRepository.findMany({
        skip: offset,
        take: itemPerPage,
        where: whereCondition,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.orderRepository.countOrder({
        where: whereCondition,
      }),
    ]);

    const result = plainToInstance(OrderEntity, list);

    return {
      list: result,
      totalProducts: total,
      totalPages: Math.ceil(total / itemPerPage),
      currentPage: currentPage,
      limit: itemPerPage,
    };
  }

  async findOne(id: string): Promise<OrderEntity> {
    const result = await this.orderRepository.findOne({ id });
    return plainToInstance(OrderEntity, result);
  }
}
