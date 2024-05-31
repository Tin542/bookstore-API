import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/entities/user.entity';
import { FilterUserDto } from 'src/dtos/user/filter-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getOneUser(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    return plainToInstance(UserEntity, user);
  }

  async findAll(filter: FilterUserDto) {
    let itemPerPage: number = filter.limit ? filter.limit : 5;
    let offset: number = filter.page > 0 ? (filter.page - 1) * filter.limit : 0;
    let currentPage: number = filter.page ? filter.page : 1;

    const list = await this.userRepository.findMany({
      skip: offset,
      take: itemPerPage,
      where: {
        AND: {
          fullName: filter.fullName ? { contains: filter.fullName } : {},
          username: filter.username ? { contains: filter.username } : {},
          email: filter.email ? { contains: filter.email } : {},
          isActive: filter.isActive ? true : {},
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.userRepository.countUser({
      where: {
        AND: {
          fullName: filter.fullName ? { contains: filter.fullName } : {},
          username: filter.username ? { contains: filter.username } : {},
          email: filter.email ? { contains: filter.email } : {},
          isActive: filter.isActive ? filter.isActive : {},
        },
      },
    });
    const result = plainToInstance(UserEntity, list);
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

  async disable(id: string) {
    const result = await this.userRepository.update({
      id: { id },
      data: {
        isActive: false,
      },
    });
    return result;
  }

  async active(id: string) {
    const result = await this.userRepository.update({
      id: { id },
      data: {
        isActive: true,
      },
    });
    return result;
  }
}
