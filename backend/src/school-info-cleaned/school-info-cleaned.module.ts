import { Module } from '@nestjs/common';
import { SchoolInfoCleanedController } from './school-info-cleaned.controller';
import { SchoolInfoCleanedService } from './school-info-cleaned.service';

@Module({
  controllers: [SchoolInfoCleanedController],
  providers: [SchoolInfoCleanedService],
})
export class SchoolInfoCleanedModule {}
