import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EntityDataQualityService } from './entity-data-quality.service';

@Controller('entity-data-quality')
export class EntityDataQualityController {
  constructor(private entityDataQualityService: EntityDataQualityService) {}

  @Get()
  getAllEntityDataQualities() {
    return this.entityDataQualityService.getAllEntityDataQualities();
  }

  @Get(':id')
  getEntityDataQualityById(
    @Param('id', ParseIntPipe) entityDataQualityId: number,
  ) {
    return this.entityDataQualityService.getEntityDataQualityById(
      entityDataQualityId,
    );
  }
}
