import { IsNotEmpty, IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class EditCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
