import { Injectable } from '@nestjs/common';
import { Prisma, About } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AboutRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: Prisma.AboutWhereUniqueInput): Promise<About | null> {
    return this.prisma.about.findUnique({ where: id });
  }

  async update(params: {
    id: Prisma.AboutWhereUniqueInput;
    data: Prisma.AboutUpdateInput;
  }): Promise<About | null> {
    const { id, data } = params;
    return this.prisma.about.update({ where: id, data: data });
  }
}
