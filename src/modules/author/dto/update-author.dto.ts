import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthorDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    updatedAt: Date;
}
