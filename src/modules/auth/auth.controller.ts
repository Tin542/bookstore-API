import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
  } from '@nestjs/common';
  import { AuthService } from 'src/shared/services/auth/auth.service';
  import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/dtos/auth/signin.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    // @Public()
    // @HttpCode(HttpStatus.OK)
    // @Post('admin/login')
    // signIn(@Body() signInDto: SignInDto) {
    //   return this.authService.signin(signInDto);
    // }
  
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }