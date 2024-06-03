import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderEntity } from 'src/entities/order.entity';
import { ReviewsRepository } from './review.repository';
import { CreateReviewDto } from 'src/dtos/review/create-review.dto';
import { ReviewEntity } from 'src/entities/review.entity';
import { FilterReviewDto } from 'src/dtos/review/filter-review.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewsRepository) {}

  async create(creatReviewDTO: CreateReviewDto): Promise<ReviewEntity> {
    const result = await this.reviewRepository.create({
      data: {
        content: creatReviewDTO.content,
        rate: creatReviewDTO.rate,
        book: {
          connect: {
            id: creatReviewDTO.bookId,
          },
        },
        user: {
          connect: {
            id: creatReviewDTO.userId,
          },
        },
      },
    });
    return plainToInstance(ReviewEntity, result);
  }

  async findAll(filter: FilterReviewDto) {
    const itemPerPage: number = filter.limit || 5;
    const offset: number =
      filter.page && filter.page > 0 ? (filter.page - 1) * itemPerPage : 0;
    const currentPage: number = filter.page || 1;

    const whereCondition: any = {
      AND: [],
    };

    if (filter.rate !== undefined) {
      whereCondition.AND.push({
        rate: { in: filter.rate }
      });
    }

    const [list, total] = await Promise.all([
      this.reviewRepository.findMany({
        skip: offset,
        take: itemPerPage,
        where: whereCondition,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.reviewRepository.countReview({
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
}
