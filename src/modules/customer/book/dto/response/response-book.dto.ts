import { BookEntity } from '../../../../../entities/book.entity';

export class ResponseBookDto {
  list: BookEntity[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
