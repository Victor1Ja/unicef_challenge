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
import { SchoolInfoFromEntityService } from './school-info-from-entity.service';
import {
  SchoolInfoFromEntityDto,
  EditSchoolInfoFromEntityDto,
} from './dto/school-info-from-entity.dto';

@Controller('school-info-from-entity')
export class SchoolInfoFromEntityController {
  constructor(
    private schoolInfoFromEntityService: SchoolInfoFromEntityService,
  ) {}

  @Get()
  getAllSchoolInfoFromEntity() {
    return this.schoolInfoFromEntityService.getAllSchoolInfoFromEntity();
  }

  @Post()
  createSchoolInfoFromEntity(@Body() dto: SchoolInfoFromEntityDto) {
    return this.schoolInfoFromEntityService.createSchoolInfoFromEntity(dto);
  }

  @Get(':id')
  getSchoolInfoFromEntityById(
    @Param('id', ParseIntPipe) schoolInfoFromEntityId: number,
  ) {
    return this.schoolInfoFromEntityService.getSchoolInfoFromEntityById(
      schoolInfoFromEntityId,
    );
  }

  @Patch(':id')
  editSchoolInfoFromEntityById(
    @Param('id', ParseIntPipe) schoolInfoFromEntityId: number,
    @Body() dto: EditSchoolInfoFromEntityDto,
  ) {
    return this.schoolInfoFromEntityService.editSchoolInfoFromEntityById(
      schoolInfoFromEntityId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteSchoolInfoFromEntityById(
    @Param('id', ParseIntPipe) schoolInfoFromEntityId: number,
  ) {
    return this.schoolInfoFromEntityService.deleteSchoolInfoFromEntityById(
      schoolInfoFromEntityId,
    );
  }
}
