import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EntityDataQualityDto {
  @IsNumber()
  entityId: number;

  @IsOptional()
  @IsString()
  addressQuality?: number;

  @IsOptional()
  @IsString()
  geolocationQuality?: number;

  @IsOptional()
  @IsString()
  hasInternetQuality?: number;

  @IsOptional()
  @IsString()
  internetSpeed?: number;
}

export class EditEntityDataQualityDto {
  @IsOptional()
  @IsString()
  addressQuality?: number;

  @IsOptional()
  @IsString()
  geolocationQuality?: number;

  @IsOptional()
  @IsString()
  hasInternetQuality?: number;

  @IsOptional()
  @IsString()
  internetSpeed?: number;
}
