import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, isString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  @Type(() => Number)
  price: number;
  @IsString()
  @IsOptional()
  description?: string;
}
