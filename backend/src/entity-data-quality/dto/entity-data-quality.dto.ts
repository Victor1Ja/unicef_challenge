import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EntityDataQualityDto {
  @IsNumber()
  entityId: number;

  @IsOptional()
  @IsString()
  addressQuality?: string;

  @IsOptional()
  @IsString()
  geolocationQuality?: string;

  @IsOptional()
  @IsString()
  hasInternetQuality?: string;

  @IsOptional()
  @IsString()
  internetSpeed?: string;
}

export class EditEntityDataQualityDto {
  @IsOptional()
  @IsString()
  addressQuality?: string;

  @IsOptional()
  @IsString()
  geolocationQuality?: string;

  @IsOptional()
  @IsString()
  hasInternetQuality?: string;

  @IsOptional()
  @IsString()
  internetSpeed?: string;
}
