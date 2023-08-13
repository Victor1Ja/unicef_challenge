import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SchoolInfoFromEntityDto {
  schoolId: number;
  entityId: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  geolocation?: string;

  @IsOptional()
  @IsBoolean()
  hasInternet?: boolean;

  @IsOptional()
  @IsString()
  internetSpeed?: string;
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
  @IsString()
  internetSpeed?: string;
}
