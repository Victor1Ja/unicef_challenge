import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SchoolInfoFromEntityController } from './school-info-from-entity.controller';
import { SchoolInfoProcessor } from './school-info-from-entity.proccesor';
import { SchoolInfoFromEntityService } from './school-info-from-entity.service';

@Module({
  controllers: [SchoolInfoFromEntityController],
  providers: [SchoolInfoFromEntityService, SchoolInfoProcessor],
  imports: [
    BullModule.registerQueue({
      name: 'schoolInfoCleaned',
    }),
  ],
})
export class SchoolInfoFromEntityModule {}
