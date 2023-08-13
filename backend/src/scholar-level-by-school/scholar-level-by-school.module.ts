import { Module } from '@nestjs/common';
import { ScholarLevelBySchoolController } from './scholar-level-by-school.controller';
import { ScholarLevelBySchoolService } from './scholar-level-by-school.service';

@Module({
  controllers: [ScholarLevelBySchoolController],
  providers: [ScholarLevelBySchoolService],
})
export class ScholarLevelBySchoolModule {}
