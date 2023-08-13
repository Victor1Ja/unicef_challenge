import { IsNumber } from 'class-validator';

export class ScholarLevelBySchoolDto {
  @IsNumber()
  schoolId: number;
  @IsNumber()
  scholarLevelId: number;
}

export class EditScholarLevelBySchoolDto {
  @IsNumber()
  schoolId?: number;
  @IsNumber()
  scholarLevelId?: number;
}
