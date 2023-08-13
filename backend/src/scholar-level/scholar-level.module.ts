import { Module } from '@nestjs/common';
import { ScholarLevelController } from './scholar-level.controller';
import { ScholarLevelService } from './scholar-level.service';

@Module({
  controllers: [ScholarLevelController],
  providers: [ScholarLevelService],
})
export class ScholarLevelModule {}
