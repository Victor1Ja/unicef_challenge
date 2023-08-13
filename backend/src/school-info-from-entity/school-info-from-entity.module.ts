import { Module } from '@nestjs/common';
import { SchoolInfoFromEntityController } from './school-info-from-entity.controller';
import { SchoolInfoFromEntityService } from './school-info-from-entity.service';

@Module({
  controllers: [SchoolInfoFromEntityController],
  providers: [SchoolInfoFromEntityService],
})
export class SchoolInfoFromEntityModule {}
