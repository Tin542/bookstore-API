import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { plainToInstance } from 'class-transformer';
import { BookEntity } from '../../../entities/book.entity';
import { FilterBookDto, SortBookByEnum } from 'src/dtos/book/filter-book.dto';
import { OrderStatus } from '@prisma/client';

jest.mock('./book.repository');

describe('BookService', () => {
  let service: BookService;
  let bookRepository: jest.Mocked<BookRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: {
            findMany: jest.fn(),
            countBook: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get(BookRepository);
  });

  describe('findAll', () => {
    it('should return paginated list of books with filters and sorting applied', async () => {
      const filterBookDto: FilterBookDto = {
        limit: 5,
        page: 1,
        sortByEnum: SortBookByEnum.POPULAR,
        title: 'Test Title',
        rate: [4, 5],
        category: ['sdfsd'],
        author: ['asdsad'],
        isActive: true,
      };

      const expectedBooks = [
        {
          id: 'qqq',
          title: 'test',
          description: 'aaaa',
          price: 10.6,
          rate: 5.0,
          isOutofStock: false,
          imageUrl: 'aaaaa',
          isActive: true,
          categoryId: 'aaaasss',
          authorId: 'erewrwr',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'efwfe',
          title: 'test',
          description: 'aaaa',
          price: 10.6,
          rate: 5.0,
          isOutofStock: false,
          imageUrl: 'aaaaa',
          isActive: true,
          categoryId: 'aaaasss',
          authorId: 'erewrwr',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id1',
          title: 'test',
          description: 'aaaa',
          price: 10.6,
          rate: 5.0,
          isOutofStock: false,
          imageUrl: 'aaaaa',
          isActive: true,
          categoryId: 'aaaasss',
          authorId: 'erewrwr',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedCount = 2;

      bookRepository.findMany.mockResolvedValue(expectedBooks);
      bookRepository.countBook.mockResolvedValue(expectedCount);

      const result = await service.findAll(filterBookDto);

      expect(bookRepository.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 5,
        where: {
          AND: [
            {
              orderDetail: {
                some: {
                  order: {
                    status: OrderStatus.DONE,
                  },
                },
              },
            },
            { title: { contains: 'Test Title' } },
            { rate: { in: [4, 5] } },
            { categoryId: { in: [1] } },
            { authorId: { in: [1] } },
            { isActive: { equals: true } },
          ],
        },
        orderBy: {
          orderDetail: {
            _count: 'desc',
          },
        },
      });

      expect(bookRepository.countBook).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              orderDetail: {
                some: {
                  order: {
                    status: OrderStatus.DONE,
                  },
                },
              },
            },
            { title: { contains: 'Test Title' } },
            { rate: { in: [4, 5] } },
            { categoryId: { in: [1] } },
            { authorId: { in: [1] } },
            { isActive: { equals: true } },
          ],
        },
      });

      expect(result).toEqual({
        list: plainToInstance(BookEntity, expectedBooks),
        totalProducts: expectedCount,
        totalPages: Math.ceil(expectedCount / filterBookDto.limit),
        currentPage: filterBookDto.page,
        limit: filterBookDto.limit,
      });
    });
  });
});
