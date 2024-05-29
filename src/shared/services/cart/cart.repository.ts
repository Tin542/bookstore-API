import { Injectable } from '@nestjs/common';
import { Prisma, CartItem } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}

  async createCartItem(params: {
    data: Prisma.CartItemCreateInput;
  }): Promise<CartItem> {
    const { data } = params;
    return this.prisma.cartItem.create({ data });
  }

  async findMany(params: {
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;
    return this.prisma.cartItem.findMany({
      where,
      orderBy,
      include: {book: true}
    });
  }

  async findOne(id: Prisma.CartItemWhereUniqueInput): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({
      where: id,
      include: { book: true },
    });
  }

  async update(params: {
    id: Prisma.CartItemWhereUniqueInput;
    data: Prisma.CartItemUpdateInput;
  }): Promise<CartItem | null> {
    const { id, data } = params;
    return this.prisma.cartItem.update({ where: id, data: data });
  }

  async delete(params: { id: Prisma.CartItemWhereUniqueInput }) {
    const { id } = params;
    return this.prisma.cartItem.delete({ where: id });
  }
}
