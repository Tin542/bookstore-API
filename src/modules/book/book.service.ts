import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { BookEntity } from '../../entities/book.entity';
import { FilterBookDto } from './dto/request/fillter-book.dto';
import { ResponseBookDto } from './dto/response/response-book.dto';
import { Prisma } from '@prisma/client';
import { DetailBookDto } from './dto/response/detail-book.dto';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    let listAuthorId = [];
    createBookDto.author.forEach((author) => {
      listAuthorId.push({
        authorId: author,
      });
    });

    const result = await this.bookRepository.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        price: createBookDto.price,
        rate: createBookDto.rate,
        quantity: createBookDto.quantity,
        imageUrl: createBookDto.imageUrl,
        category: {
          connect: {
            id: createBookDto.category,
          },
        },
        authors: {
          createMany: {
            data: listAuthorId,
          },
        },
      },
    });
    return plainToInstance(BookEntity, result);
  }

  async findAll(filter: FilterBookDto): Promise<ResponseBookDto> {
    let itemPerPage: number = filter.limit ? filter.limit : 5;
    let offset: number = filter.page > 0 ? (filter.page - 1) * filter.limit : 0;
    let currentPage: number = filter.page ? filter.page : 1;

    const listBooks = await this.bookRepository.findMany({
      skip: offset,
      take: itemPerPage,
      where: {
        AND: {
          title: { contains: filter.title },
          price: { gte: filter.minPrice, lte: filter.maxPrice },
          rate: { equals: filter.rate },
          categoryId: { in: filter.category },
          authors: { some: { authorId: { in: filter.author } } },
        },
      },
      orderBy: {
        createdAt: filter.sortByCreateDate,
      },
    });

    const total = await this.bookRepository.countBook({
      where: {
        AND: {
          title: { contains: filter.title },
          price: { gte: filter.minPrice, lte: filter.maxPrice },
          rate: { equals: filter.rate },
          categoryId: { in: filter.category },
          authors: { some: { bookId: { in: filter.author } } },
        },
      },
    });
    const result = listBooks.map((book) => plainToInstance(BookEntity, book));
    return {
      list: result,
      totalProducts: total,
      totalPages:
        total % itemPerPage !== 0
          ? Math.floor(total / itemPerPage) + 1
          : total / itemPerPage,
      currentPage: currentPage,
      limit: itemPerPage,
    };
  }

  async findOne(id: string): Promise<BookEntity> {
    const result = await this.bookRepository.findOne({ id });
    return plainToInstance(BookEntity, result);
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    let listAuthorId = [];
    updateBookDto.author.forEach((author) => {
      listAuthorId.push({
        authorId: author,
      });
    });
    const result = await this.bookRepository.update({
      id: { id },
      data: {
        title: updateBookDto.title,
        description: updateBookDto.description,
        price: updateBookDto.price,
        rate: updateBookDto.rate,
        imageUrl: updateBookDto.imageUrl,
        category: {
          connect: {
            id: updateBookDto.category,
          },
        },
        authors: {
          createMany: {
            data: listAuthorId,
          },
        },
      },
    });
    return plainToInstance(BookEntity, result);
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }
}
