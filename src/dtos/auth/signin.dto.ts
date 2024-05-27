import { IsEmpty, IsString, MinLength } from 'class-validator';

export class SignUpInputDto {
  @IsString()
  @IsEmpty()
  username: string;

  @MinLength(6)
  password: string;
}
