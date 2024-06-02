import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Request, Response } from 'express';
import { SessionData } from 'express-session';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Req() req: Request, @Res() res: Response, @Session() session: SessionData) {
    let data = req.body;
    const result = await this.authService.signinAdmin(
      data.username,
      data.password,
    );
    // console.log('login', result);
    // console.log('cookie', req.cookies);
    return res.redirect("/admin/book");
  }

  @Get('login')
  getProfile(@Res() res: Response) {
    return res.render('loginPage.ejs');
  }
}
