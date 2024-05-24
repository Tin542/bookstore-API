// import { Injectable } from '@nestjs/common';
// import { Prisma, User  } from '@prisma/client';
// import { PrismaService } from '../../../shared/prisma/prisma.service';

// @Injectable()
// export class UserRepository {
//   constructor(private prisma: PrismaService) {}

//   async create(params: {
//     data: Prisma.CategoryCreateInput;
//   }): Promise<User> {
//     const { data } = params;
//     return this.prisma.user.create({ data });
//   }

//   async findMany(params: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.CategoryWhereUniqueInput;
//     where?: Prisma.CategoryWhereInput;
//     orderBy?: Prisma.CategoryOrderByWithRelationInput;
//   }): Promise<Category[]> {
//     const { skip, take, where, orderBy, cursor } = params;
//     return this.prisma.category.findMany({
//       skip,
//       take,
//       cursor,
//       where,
//       orderBy,
//     });
//   }

//   async count(params: {
//     where?: Prisma.CategoryWhereInput;
//   }): Promise<number> {
//     const { where } = params;
//     return this.prisma.category.count({
//       where,
//     });
//   }

//   async findOne(id: Prisma.CategoryWhereUniqueInput): Promise<Category | null> {
//     return this.prisma.category.findUnique({ where: id });
//   }

//   async update(params: {
//     id: Prisma.CategoryWhereUniqueInput;
//     data: Prisma.BookUpdateInput;
//   }): Promise<Category | null> {
//     const { id, data } = params;
//     return this.prisma.category.update({ where: id, data: data });
//   }

//   async delete(id: Prisma.CategoryWhereUniqueInput): Promise<Category> {
//     return this.prisma.category.delete({ where: id });
//   }
// }
