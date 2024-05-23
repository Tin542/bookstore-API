import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { BookEntity } from '../../../entities/book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDto } from 'src/dtos/book/create-book.dto';
import { FilterBookDto } from 'src/dtos/book/fillter-book.dto';
import { UpdateBookDto } from 'src/dtos/book/update-book.dto';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    const result = await this.bookRepository.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        price: createBookDto.price,
        rate: createBookDto.rate,
        imageUrl: createBookDto.imageUrl,
        category: {
          connect: {
            id: createBookDto.category,
          },
        },
        author: {
          connect: {
            id: createBookDto.author,
          },
        },
      },
    });
    return plainToInstance(BookEntity, result);
  }

  async findAll(filter: FilterBookDto) {
    let itemPerPage: number = filter.limit ? filter.limit : 5;
    let offset: number = filter.page > 0 ? (filter.page - 1) * filter.limit : 0;
    let currentPage: number = filter.page ? filter.page : 1;

    const listBooks = await this.bookRepository.findMany({
      skip: offset,
      take: itemPerPage,
      where: {
        AND: {
          title: filter.title ? { contains: filter.title } : {},
          rate: filter.rate ? { equals: filter.rate } : {},
          categoryId: filter.category.length > 0 ? { in: filter.category } : {},
          authorId: filter.author.length > 0 ? { in: filter.author } : {},
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.bookRepository.countBook({
      where: {
        AND: {
          title: filter.title ? { contains: filter.title } : {},
          rate: filter.rate ? { equals: filter.rate } : {},
          categoryId: filter.category.length > 0 ? { in: filter.category } : {},
          authorId: filter.author.length > 0 ? { in: filter.author } : {},
        },
      },
    });
    const result = plainToInstance(BookEntity, listBooks);
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
        author: {
          connect: {
            id: updateBookDto.author,
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
