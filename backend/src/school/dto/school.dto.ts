import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SchoolDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  cityId: number;
}

export class EditSchoolDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  cityId?: number;
}
