import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolInfoCleaned } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  SchoolInfoCleanedDto,
  EditSchoolInfoCleanedDto,
} from './dto/school-info-cleaned.dto';

@Injectable()
export class SchoolInfoCleanedService {
  constructor(private prisma: PrismaService) {}

  getAllSchoolInfoCleaned() {
    return this.prisma.schoolInfoCleaned.findMany();
  }

  createSchoolInfoCleaned(dto: SchoolInfoCleanedDto) {
    // ! This is a workaround for the Prisma bug
    return this.prisma.schoolInfoCleaned.create({
      data: { ...(dto as unknown as SchoolInfoCleaned) },
    });
  }

  async getSchoolInfoCleanedById(schoolInfoCleanedId: number) {
    const schoolInfoCleaned = await this.prisma.schoolInfoCleaned.findUnique({
      where: { schoolId: schoolInfoCleanedId },
    });
    if (!schoolInfoCleaned)
      throw new NotFoundException('SchoolInfoCleaned not found');
    return schoolInfoCleaned;
  }

  async editSchoolInfoCleanedById(
    schoolInfoCleanedId: number,
    dto: EditSchoolInfoCleanedDto,
  ) {
    const schoolInfoCleaned = await this.prisma.schoolInfoCleaned.findUnique({
      where: { schoolId: schoolInfoCleanedId },
    });
    if (!schoolInfoCleaned)
      throw new NotFoundException('SchoolInfoCleaned not found');

    return this.prisma.schoolInfoCleaned.update({
      where: { schoolId: schoolInfoCleanedId },
      data: { ...dto },
    });
  }

  async deleteSchoolInfoCleanedById(schoolInfoCleanedId: number) {
    const schoolInfoCleaned = await this.prisma.schoolInfoCleaned.findUnique({
      where: { schoolId: schoolInfoCleanedId },
    });
    if (!schoolInfoCleaned)
      throw new NotFoundException('SchoolInfoCleaned not found');

    return this.prisma.schoolInfoCleaned.delete({
      where: { schoolId: schoolInfoCleanedId },
    });
  }
}
