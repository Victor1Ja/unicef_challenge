import { Module } from '@nestjs/common';
import { EntityDataQualityController } from './entity-data-quality.controller';
import { EntityDataQualityService } from './entity-data-quality.service';

@Module({
  controllers: [EntityDataQualityController],
  providers: [EntityDataQualityService],
})
export class EntityDataQualityModule {}
