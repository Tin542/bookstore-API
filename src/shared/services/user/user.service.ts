import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private userService: UserRepository) {}

  async getOneUser(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    return plainToInstance(UserEntity, user);
  }
}
