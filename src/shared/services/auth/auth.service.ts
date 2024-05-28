import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { TokenPayload } from 'src/dtos/auth/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}
  async getAuthenticatedUser(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.authRepository.findOne({ username });
    await this.verifyPlainContentWithHashedContent(password, user.password);
    return plainToInstance(UserEntity, user);
  }

  private async verifyPlainContentWithHashedContent(
    plain_text: string,
    hashed_text: string,
  ) {
    const is_matching = await comparePassword(plain_text, hashed_text);
    if (!is_matching) {
      throw new BadRequestException();
    }
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }
  
  async signin(signinDto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.getAuthenticatedUser(signinDto.username, signinDto.password);
    const payload = { sub: user.id, username: user.username };
    // create access token
    const accessToken = this.generateAccessToken(payload);
    const result = plainToInstance(SignInResponseDto, {
      accessToken,
      userInfo: user,
    });
    return result;
  }

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
}
