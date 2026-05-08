import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'FPT Software' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ha Noi', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'Leading IT company in Vietnam', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://fpt.com/logo.png', required: false })
  @IsOptional()
  @IsUrl()
  logo?: string;
}
