import { BookEntity } from 'src/entities/book.entity';

export class ResponseBookDto {
  list: BookEntity[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
