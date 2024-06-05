import {
  Controller,
  Get,
  Logger,
  Render,
  Req,
  Query,
  Post,
  Res,
} from '@nestjs/common';
import { Request, Response, json } from 'express';
import { PromotionService } from 'src/shared/services/promotion/promotion.service';
import { CreatePromotionDto } from 'src/dtos/promotion/create-promotion.dto';
import { plainToInstance } from 'class-transformer';
import { BookService } from 'src/shared/services/book/book.service';
import { FilterBookDto } from 'src/dtos/book/filter-book.dto';
import { FilterPromotionDto, statusPromotion } from 'src/dtos/promotion/filter-promotion.dto';

@Controller('admin/promotion')
export class PromotionController {
  private readonly logger = new Logger(PromotionController.name);
  constructor(
    private readonly promotionService: PromotionService,
    private readonly bookService: BookService,
  ) {}

  @Get('add')
  @Render('adminPage')
  async loadAddPromotionPage(
    @Req() req: Request,
  ) {
    
    const result = await this.bookService.findAllWithoutPagination();
    return {
      module: 'addPromotionPage',
      listBook: result,
    };
  }

  @Post('create')
  async create(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Create promotion');
    try {
      const data: CreatePromotionDto = {
        title: req.body.title,
        bookId: req.body.bookId,
        description: req.body.description,
        discountPercent: parseInt(req.body.discountPercent),
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate)
      } 
      await this.promotionService.create(data);
      return res.redirect('/admin/promotion');
    } catch (error) {
      console.log('errro create promotion', error);
    }
  }

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
      let filters: FilterPromotionDto = {
        title: requestData.title as string,
        status: requestData.status as statusPromotion,
        page: page ? parseInt(page.toString(), 10) : 1,
        limit: limit ? parseInt(limit.toString(), 10) : 5,
      };
      const result = await this.promotionService.findAll(filters);
      return {
        module: 'promotion',
        pages: result.totalPages,
        currentPage: result.currentPage,
        filters,
        data: result.list,
      };
    } catch (error) {
      this.logger.error(
        `Failed to retrieve orders: ${error.message}`,
        error.stack,
      );
      return { errMessage: error.message };
    }
  }

  // @Get('detail/:id')
  // @Render('adminPage')
  // async getDetail(@Req() req: Request) {
  //   this.logger.log('Detail Order');
  //   try {
  //     const oid = req.params.id;
  //     const result = await this.orderService.findOne(oid);
  //     return {
  //       module: 'orderDetail',
  //       data: result
  //     }
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to retrieve order detail: ${error.message}`,
  //       error.stack,
  //     );
  //     return { errMessage: error.message };
  //   }
  // }

  // @Post('update-status')
  // async acive(@Req() req: Request, @Res() res: Response)  {
  //   this.logger.log('update-status');
  //   try {
  //     let dataReq = req.body;
  //     if(dataReq.status ==="DONE" && dataReq.paidAt==="false") {
  //       return res.json({message: "Đơn hàng chưa được thanh toán !"})
  //     }
  //     const dataUpdate: UpdateStatusOrderDto = {
  //       status: dataReq.status,
  //       paidAt: dataReq.paidAt==="true" ? new Date() : null,
  //     }
  //     await this.orderService.upateStatus(dataReq.oid, dataUpdate);
  //     return res.redirect(`/admin/order/detail/${dataReq.oid}`);
  //   } catch (error) {
  //     this.logger.error(
  //       `Failed to update order detail: ${error.message}`,
  //       error.stack,
  //     );
  //     return { errMessage: error.message };
  //   }
  // }
}
