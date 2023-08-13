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
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CityService } from './city.service';
import { CityDto, EditCityDto } from './dto/city.dto';

@UseGuards(JwtGuard)
@Controller('cities')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get()
  getAllCities() {
    return this.cityService.getAllCities();
  }

  @Post()
  createCity(@Body() dto: CityDto) {
    return this.cityService.createCity(dto);
  }

  @Get(':id')
  getCityById(@Param('id', ParseIntPipe) cityId: number) {
    return this.cityService.getCityById(cityId);
  }

  @Patch(':id')
  editCityById(
    @Param('id', ParseIntPipe) cityId: number,
    @Body() dto: EditCityDto,
  ) {
    return this.cityService.editCityById(cityId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCityById(@Param('id', ParseIntPipe) cityId: number) {
    return this.cityService.deleteCityById(cityId);
  }
}
