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
import { EntityDataQualityService } from './entity-data-quality.service';
import {
  EntityDataQualityDto,
  EditEntityDataQualityDto,
} from './dto/entity-data-quality.dto';

@Controller('entity-data-quality')
export class EntityDataQualityController {
  constructor(private entityDataQualityService: EntityDataQualityService) {}

  @Get()
  getAllEntityDataQualities() {
    return this.entityDataQualityService.getAllEntityDataQualities();
  }

  @Post()
  createEntityDataQuality(@Body() dto: EntityDataQualityDto) {
    return this.entityDataQualityService.createEntityDataQuality(dto);
  }

  @Get(':id')
  getEntityDataQualityById(
    @Param('id', ParseIntPipe) entityDataQualityId: number,
  ) {
    return this.entityDataQualityService.getEntityDataQualityById(
      entityDataQualityId,
    );
  }

  @Patch(':id')
  editEntityDataQualityById(
    @Param('id', ParseIntPipe) entityDataQualityId: number,
    @Body() dto: EditEntityDataQualityDto,
  ) {
    return this.entityDataQualityService.editEntityDataQualityById(
      entityDataQualityId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEntityDataQualityById(
    @Param('id', ParseIntPipe) entityDataQualityId: number,
  ) {
    return this.entityDataQualityService.deleteEntityDataQualityById(
      entityDataQualityId,
    );
  }
}
