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
import { SchoolService } from './school.service';
import { SchoolDto, EditSchoolDto } from './dto/school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private schoolService: SchoolService) {}

  @Get()
  getAllSchools() {
    return this.schoolService.getAllSchools();
  }

  @Post()
  createSchool(@Body() dto: SchoolDto) {
    return this.schoolService.createSchool(dto);
  }

  @Get(':id')
  getSchoolById(@Param('id', ParseIntPipe) schoolId: number) {
    return this.schoolService.getSchoolById(schoolId);
  }

  @Patch(':id')
  editSchoolById(
    @Param('id', ParseIntPipe) schoolId: number,
    @Body() dto: EditSchoolDto,
  ) {
    return this.schoolService.editSchoolById(schoolId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSchoolById(@Param('id', ParseIntPipe) schoolId: number) {
    return this.schoolService.deleteSchoolById(schoolId);
  }
}
