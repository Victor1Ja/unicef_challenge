import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SchoolInfoFromEntityDto {
  @IsNumber()
  @IsNotEmpty()
  schoolId: number;

  @IsNumber()
  @IsNotEmpty()
  entityId: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsBoolean()
  hasInternet?: boolean;

  @IsOptional()
  @IsNumber()
  internetSpeed?: number;
}

export class EditSchoolInfoFromEntityDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsBoolean()
  hasInternet?: boolean;

  @IsOptional()
  @IsNumber()
  internetSpeed?: number;
}
