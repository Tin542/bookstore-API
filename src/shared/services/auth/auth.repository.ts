import { Injectable } from '@nestjs/common';
import { Admin, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async signup(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async findOne(username: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: username });
  }

  async findOneAdmin(username: Prisma.AdminWhereUniqueInput): Promise<Admin | null>{
    return this.prisma.admin.findUnique({ where: username });
  }
}
