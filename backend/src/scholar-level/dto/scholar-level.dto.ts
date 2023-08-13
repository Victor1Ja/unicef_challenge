import { IsOptional, IsString } from 'class-validator';

export class ScholarLevelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class EditScholarLevelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
