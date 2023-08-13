import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export enum EntityType {
  SCHOOL = 'school',
  GOVERNMENT = 'gob',
  INTERNET_PROVIDER = 'isp',
}

export class EntityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(EntityType)
  @IsNotEmpty()
  type: EntityType;
}

export class EditEntityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
