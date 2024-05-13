import { Injectable } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { BookEntity } from '../../entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.BookCreateInput }): Promise<Book> {
    const { data } = params;
    return this.prisma.book.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<BookEntity[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async countBook(params: { where?: Prisma.BookWhereInput }): Promise<number> {
    const { where } = params;
    return this.prisma.book.count({
      where,
    });
  }

  async findOne(id: Prisma.BookWhereUniqueInput): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: id,
      include: { category: true, authors: { select: { author: true } } },
    });
  }

  async update(params: {
    id: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book | null> {
    const { id, data } = params;
    return this.prisma.book.update({ where: id, data: data });
  }

  async delete(id: Prisma.BookWhereUniqueInput): Promise<Book> {
    return this.prisma.book.delete({ where: id });
  }
}
