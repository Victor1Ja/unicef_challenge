import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SchoolInfoCleanedDto {
  schoolId: number;

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
  @IsString()
  geolocationAccuracy?: number;

  @IsOptional()
  @IsBoolean()
  hasInternet?: boolean;

  @IsOptional()
  @IsString()
  internetSpeed?: string;
}

export class EditSchoolInfoCleanedDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  geolocationPos?: string;

  @IsOptional()
  @IsString()
  geolocationAccuracy?: string;

  @IsOptional()
  @IsBoolean()
  hasInternet?: boolean;

  @IsOptional()
  @IsString()
  internetSpeed?: string;
}
