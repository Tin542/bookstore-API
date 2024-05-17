import { Module } from '@nestjs/common';
import { AuthorService } from '../../../shared/services/author/author.service';
import { AuthorController } from './author.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthorRepository } from '../../../shared/services/author/author.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
})
export class AuthorModule {}
