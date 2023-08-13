import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryDto, EditCountryDto } from './dto/country.dto';

@Controller('countries')
// @UseGuards(JwtGuard)
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  getAllCountries() {
    return this.countryService.getAllCountries();
  }

  @Post()
  createCountry(@Body() dto: CountryDto) {
    return this.countryService.createCountry(dto);
  }

  @Get(':id')
  getCountryById(@Param('id', ParseIntPipe) countryId: number) {
    return this.countryService.getCountryById(countryId);
  }

  @Patch(':id')
  editCountryById(
    @Param('id', ParseIntPipe) countryId: number,
    @Body() dto: EditCountryDto,
  ) {
    return this.countryService.editCountryById(countryId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCountryById(@Param('id', ParseIntPipe) countryId: number) {
    return this.countryService.deleteCountryById(countryId);
  }
}
