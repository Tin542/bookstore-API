import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@prisma/client';
import { BookEntity } from './book.entity';

export class AuthorEntity implements Author {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({required: false, type: BookEntity})
  book?: BookEntity[]
}
