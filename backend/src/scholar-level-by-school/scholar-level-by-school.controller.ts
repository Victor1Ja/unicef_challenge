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
import { ScholarLevelBySchoolService } from './scholar-level-by-school.service';
import {
  ScholarLevelBySchoolDto,
  EditScholarLevelBySchoolDto,
} from './dto/scholar-level-by-school.dto';

@Controller('scholar-level-by-school')
export class ScholarLevelBySchoolController {
  constructor(
    private scholarLevelBySchoolService: ScholarLevelBySchoolService,
  ) {}

  @Get()
  getAllScholarLevelsBySchool() {
    return this.scholarLevelBySchoolService.getAllScholarLevelsBySchool();
  }

  @Post()
  createScholarLevelBySchool(@Body() dto: ScholarLevelBySchoolDto) {
    return this.scholarLevelBySchoolService.createScholarLevelBySchool(dto);
  }

  @Get(':id')
  getScholarLevelBySchoolById(
    @Param('id', ParseIntPipe) scholarLevelBySchoolId: number,
  ) {
    return this.scholarLevelBySchoolService.getScholarLevelBySchoolById(
      scholarLevelBySchoolId,
    );
  }

  @Patch(':id')
  editScholarLevelBySchoolById(
    @Param('id', ParseIntPipe) scholarLevelBySchoolId: number,
    @Body() dto: EditScholarLevelBySchoolDto,
  ) {
    return this.scholarLevelBySchoolService.editScholarLevelBySchoolById(
      scholarLevelBySchoolId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteScholarLevelBySchoolById(
    @Param('id', ParseIntPipe) scholarLevelBySchoolId: number,
  ) {
    return this.scholarLevelBySchoolService.deleteScholarLevelBySchoolById(
      scholarLevelBySchoolId,
    );
  }
}
