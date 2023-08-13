import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SchoolDto, EditSchoolDto } from './dto/school.dto';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  getAllSchools() {
    return this.prisma.school.findMany();
  }

  createSchool(dto: SchoolDto) {
    return this.prisma.school.create({ data: { ...dto } });
  }

  async getSchoolById(schoolId: number) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async editSchoolById(schoolId: number, dto: EditSchoolDto) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('School not found');

    return this.prisma.school.update({
      where: { id: schoolId },
      data: { ...dto },
    });
  }

  async deleteSchoolById(schoolId: number) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('School not found');

    return this.prisma.school.delete({ where: { id: schoolId } });
  }
}
