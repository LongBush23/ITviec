import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 22, required: false })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({ example: 'male', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: 'Ha Noi', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'USER', required: false })
  @IsString()
  @IsOptional()
  role?: string;
}
