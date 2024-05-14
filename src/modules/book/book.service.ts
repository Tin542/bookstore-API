import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { BookEntity } from '../../entities/book.entity';
import { FillterBookDto } from './dto/request/fillter-book.dto';

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

  async findAll(
    fillterBookDto: FillterBookDto,
    page: number,
    limit: number,
    sort: string,
  ): Promise<{
    data: BookEntity[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }> {
    let itemPerPage: number = limit ? limit : 5;
    let offset: number = page > 0 ? (page - 1) * limit : 0;
    let currentPage: number = page ? page : 1;

    const listBooks = await this.bookRepository.findMany({
      skip: offset,
      take: itemPerPage,
      where: {
        AND: {
          title: { contains: fillterBookDto.title },
          price: { gte: fillterBookDto.minPrice, lte: fillterBookDto.maxPrice },
          rate: { equals: fillterBookDto.rate },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    const total = await this.bookRepository.countBook({
      where: {
        AND: {
          title: { contains: fillterBookDto.title },
          price: { gte: fillterBookDto.minPrice, lte: fillterBookDto.maxPrice },
          rate: { equals: fillterBookDto.rate },
        },
      },
    });
    const result = listBooks.map((book) =>
      plainToInstance(BookEntity, book),
    );
    return {
      data: result,
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
