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
import { ScholarLevelService } from './scholar-level.service';
import { ScholarLevelDto, EditScholarLevelDto } from './dto';

@Controller('scholar-levels')
export class ScholarLevelController {
  constructor(private scholarLevelService: ScholarLevelService) {}

  @Get()
  getAllScholarLevels() {
    return this.scholarLevelService.getAllScholarLevels();
  }

  @Post()
  createScholarLevel(@Body() dto: ScholarLevelDto) {
    return this.scholarLevelService.createScholarLevel(dto);
  }

  @Get(':id')
  getScholarLevelById(@Param('id', ParseIntPipe) scholarLevelId: number) {
    return this.scholarLevelService.getScholarLevelById(scholarLevelId);
  }

  @Patch(':id')
  editScholarLevelById(
    @Param('id', ParseIntPipe) scholarLevelId: number,
    @Body() dto: EditScholarLevelDto,
  ) {
    return this.scholarLevelService.editScholarLevelById(scholarLevelId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteScholarLevelById(@Param('id', ParseIntPipe) scholarLevelId: number) {
    return this.scholarLevelService.deleteScholarLevelById(scholarLevelId);
  }
}
