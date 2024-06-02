import { OrderStatus } from '@prisma/client';

export class FilterOrderkDto {
  id?: string;
  status?: OrderStatus;
  isPaid?: boolean
  page?: number;
  limit?: number;
}
