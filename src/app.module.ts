import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './shared/services/auth/auth.service';
import { AuthResolver } from './modules/auth/auth.resolver';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
    AdminModule,
    CustomerModule,
    CloudinaryModule,
    AuthModule,
  ],
  providers: [providePrismaClientExceptionFilter(), AuthResolver, AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AppModule {}
