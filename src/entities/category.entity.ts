import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
export class CategoryEntity implements Category {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  isActive: boolean;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;
}
