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
import { EditProvinceDto, ProvinceDto } from './dto/province.dto';
import { ProvinceService } from './province.service';

// @UseGuards(JwtGuard)
@Controller('provinces')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Get()
  getAllProvinces() {
    return this.provinceService.getAllProvinces();
  }

  @Post()
  createProvince(@Body() dto: ProvinceDto) {
    return this.provinceService.createProvince(dto);
  }

  @Get(':id')
  getProvinceById(@Param('id', ParseIntPipe) provinceId: number) {
    return this.provinceService.getProvinceById(provinceId);
  }

  @Patch(':id')
  editProvinceById(
    @Param('id', ParseIntPipe) provinceId: number,
    @Body() dto: EditProvinceDto,
  ) {
    return this.provinceService.editProvinceById(provinceId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProvinceById(@Param('id', ParseIntPipe) provinceId: number) {
    return this.provinceService.deleteProvinceById(provinceId);
  }
}
