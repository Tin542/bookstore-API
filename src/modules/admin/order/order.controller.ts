import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Render,
  Req,
  Res,
  Redirect,
  Query,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { CategoryService } from '../../../shared/services/category/category.service';
import { CreateCategoryDto } from '../../../dtos/category/create-category.dto';
import { UpdateCategoryDto } from '../../../dtos/category/update-category.dto';
import { Category } from '../../../entities/category.entity';
import { plainToInstance } from 'class-transformer';
import { FilterCategoryDto } from 'src/dtos/category/filter-category.dto';
import { OrderService } from 'src/shared/services/order/order.service';
import { FilterOrderkDto } from 'src/dtos/order/filter-order.dto';
import { OrderStatus } from '@prisma/client';

@Controller('admin/order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Render('adminPage')
  async findAll(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    this.logger.log('find all Order');
    try {
        let requestData = req.query;
      console.log('params: ', requestData);
      let filters: FilterOrderkDto = {
        id: requestData.id as string,
        status: requestData.status as OrderStatus,
        isPaid: requestData.isPaid ? requestData.isPaid === 'true' : undefined,
        page: page ? parseInt(page.toString(), 10) : 1,
        limit: limit ? parseInt(limit.toString(), 10) : 5,

      }
      const result = await this.orderService.findAll(filters);
      return {
        module: 'order',
        pages: result.totalPages,
        currentPage: filters.page,
        filters,
        data: result.list,
      };
    } catch (error) {
        this.logger.error(`Failed to retrieve orders: ${error.message}`, error.stack);
        return { errMessage: error.message };
    }
  }
}
