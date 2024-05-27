import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User } from '@prisma/client';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { AuthRepository } from './auth.repository';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/entities/user.entity';
import { hashPassword } from 'src/shared/utils/hashPassword.util';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async signup(signupDto: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await hashPassword(signupDto.password);
    const result = await this.authRepository.signup({
      data: {
        fullName: signupDto.fullName,
        address: signupDto.address,
        phoneNumber: signupDto.phoneNumber,
        email: signupDto.email,
        useranme: signupDto.username,
        password: hashedPassword,
        avatar: signupDto.avatar,
      },
    });
    return plainToInstance(UserEntity, result);
  }
}
