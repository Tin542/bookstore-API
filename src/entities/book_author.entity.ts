import { ApiProperty } from '@nestjs/swagger';
import { Author, BookAuthor } from '@prisma/client';
import { BookEntity } from './book.entity';
import { AuthorEntity } from './author.entity';

export class BookAuthorEntity implements BookAuthor {

  @ApiProperty()
  id: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  bookId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

}
