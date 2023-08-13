import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  provinceId: number;
}

export class EditCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  provinceId: number;
}
