import { Injectable } from '@nestjs/common';
import { Prisma, Order } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(params: { data: Prisma.OrderCreateInput }): Promise<Order> {
    const { data } = params;
    return this.prisma.order.create({
      data,
      include: { OrderDetail: { include: { book: true } } },
    });
  }

  async findMany(params: {
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;
    return this.prisma.order.findMany({
      where,
      orderBy,
      include: { OrderDetail: { include: { book: true } } },
    });
  }

  async findOne(id: Prisma.OrderWhereUniqueInput): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: id,
      include: { OrderDetail: { include: { book: true } } },
    });
  }
}
