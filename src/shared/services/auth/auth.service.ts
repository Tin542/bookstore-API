import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { AuthRepository } from './auth.repository';
import { UserEntity } from 'src/entities/user.entity';
import {
  hashPassword,
  comparePassword,
} from 'src/shared/utils/hashPassword.util';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { SignInResponseDto } from 'src/dtos/auth/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<UserEntity> {
    const hashedPassword = await hashPassword(signupDto.password);
    const result = await this.authRepository.signup({
      data: {
        fullName: signupDto.fullName,
        address: signupDto.address,
        phoneNumber: signupDto.phoneNumber,
        email: signupDto.email,
        username: signupDto.username,
        password: hashedPassword,
        avatar: signupDto.avatar,
      },
    });
    return plainToInstance(UserEntity, result);
  }
  async signin(signinDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.authRepository.findOne({
      username: signinDto.username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isCorrectPassword = await comparePassword(signinDto.password, user?.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    // generate our JWT from a subset
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
