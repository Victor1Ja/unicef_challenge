import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProvinceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: number;
}

export class EditProvinceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: number;
}
