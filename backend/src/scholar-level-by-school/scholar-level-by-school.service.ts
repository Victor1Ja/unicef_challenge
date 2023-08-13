import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ScholarLevelBySchoolDto,
  EditScholarLevelBySchoolDto,
} from './dto/scholar-level-by-school.dto';

@Injectable()
export class ScholarLevelBySchoolService {
  constructor(private prisma: PrismaService) {}

  getAllScholarLevelsBySchool() {
    return this.prisma.scholarLevelBySchool.findMany();
  }

  createScholarLevelBySchool(dto: ScholarLevelBySchoolDto) {
    return this.prisma.scholarLevelBySchool.create({ data: { ...dto } });
  }

  async getScholarLevelBySchoolById(scholarLevelBySchoolId: number) {
    const scholarLevelBySchool =
      await this.prisma.scholarLevelBySchool.findUnique({
        where: { id: scholarLevelBySchoolId },
      });
    if (!scholarLevelBySchool)
      throw new NotFoundException('ScholarLevelBySchool not found');
    return scholarLevelBySchool;
  }

  async editScholarLevelBySchoolById(
    scholarLevelBySchoolId: number,
    dto: EditScholarLevelBySchoolDto,
  ) {
    const scholarLevelBySchool =
      await this.prisma.scholarLevelBySchool.findUnique({
        where: { id: scholarLevelBySchoolId },
      });
    if (!scholarLevelBySchool)
      throw new NotFoundException('ScholarLevelBySchool not found');

    return this.prisma.scholarLevelBySchool.update({
      where: { id: scholarLevelBySchoolId },
      data: { ...dto },
    });
  }

  async deleteScholarLevelBySchoolById(scholarLevelBySchoolId: number) {
    const scholarLevelBySchool =
      await this.prisma.scholarLevelBySchool.findUnique({
        where: { id: scholarLevelBySchoolId },
      });
    if (!scholarLevelBySchool)
      throw new NotFoundException('ScholarLevelBySchool not found');

    return this.prisma.scholarLevelBySchool.delete({
      where: { id: scholarLevelBySchoolId },
    });
  }
}
