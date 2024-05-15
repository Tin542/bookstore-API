import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AdminModule } from './modules/admin/admin.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [PrismaModule, AdminModule, CustomerModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
