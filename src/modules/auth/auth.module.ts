import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { AuthRepository } from 'src/shared/services/auth/auth.repository';
import { AuthGuard } from 'src/shared/services/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  providers: [AuthResolver, AuthService, AuthRepository],
  exports: [AuthRepository, AuthService],
})
export class AuthModule {}
