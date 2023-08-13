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
import { SchoolInfoCleanedService } from './school-info-cleaned.service';
import {
  SchoolInfoCleanedDto,
  EditSchoolInfoCleanedDto,
} from './dto/school-info-cleaned.dto';

@Controller('school-info-cleaned')
export class SchoolInfoCleanedController {
  constructor(private schoolInfoCleanedService: SchoolInfoCleanedService) {}

  @Get()
  getAllSchoolInfoCleaned() {
    return this.schoolInfoCleanedService.getAllSchoolInfoCleaned();
  }

  @Post()
  createSchoolInfoCleaned(@Body() dto: SchoolInfoCleanedDto) {
    return this.schoolInfoCleanedService.createSchoolInfoCleaned(dto);
  }

  @Get(':id')
  getSchoolInfoCleanedById(
    @Param('id', ParseIntPipe) schoolInfoCleanedId: number,
  ) {
    return this.schoolInfoCleanedService.getSchoolInfoCleanedById(
      schoolInfoCleanedId,
    );
  }

  @Patch(':id')
  editSchoolInfoCleanedById(
    @Param('id', ParseIntPipe) schoolInfoCleanedId: number,
    @Body() dto: EditSchoolInfoCleanedDto,
  ) {
    return this.schoolInfoCleanedService.editSchoolInfoCleanedById(
      schoolInfoCleanedId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSchoolInfoCleanedById(
    @Param('id', ParseIntPipe) schoolInfoCleanedId: number,
  ) {
    return this.schoolInfoCleanedService.deleteSchoolInfoCleanedById(
      schoolInfoCleanedId,
    );
  }
}
