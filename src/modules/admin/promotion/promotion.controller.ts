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
import { Request, Response } from 'express';
import { PromotionService } from 'src/shared/services/promotion/promotion.service';
import { CreatePromotionDto } from 'src/dtos/promotion/create-promotion.dto';
import { BookService } from 'src/shared/services/book/book.service';
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
  @Post('disable/:id')
  async disable(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Disable Promotion');
    try {
      let id = req.params.id;
      await this.promotionService.disable(id);
      return res.redirect('/admin/promotion');
    } catch (error) {
      return res.send({ errMessage: error });
    }
  }
  @Post('active/:id')
  async active(@Req() req: Request, @Res() res: Response) {
    this.logger.log('Active Promotion');
    try {
      let id = req.params.id;
      await this.promotionService.active(id);
      return res.redirect('/admin/promotion');
    } catch (error) {
      return res.send({ errMessage: error });
    }
  }

}