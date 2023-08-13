import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScholarLevelDto, EditScholarLevelDto } from './dto';

@Injectable()
export class ScholarLevelService {
  constructor(private prisma: PrismaService) {}

  getAllScholarLevels() {
    return this.prisma.scholarLevel.findMany();
  }

  createScholarLevel(dto: ScholarLevelDto) {
    return this.prisma.scholarLevel.create({ data: { ...dto } });
  }

  async getScholarLevelById(scholarLevelId: number) {
    const scholarLevel = await this.prisma.scholarLevel.findUnique({
      where: { id: scholarLevelId },
    });
    if (!scholarLevel) throw new NotFoundException('ScholarLevel not found');
    return scholarLevel;
  }

  async editScholarLevelById(scholarLevelId: number, dto: EditScholarLevelDto) {
    const scholarLevel = await this.prisma.scholarLevel.findUnique({
      where: { id: scholarLevelId },
    });
    if (!scholarLevel) throw new NotFoundException('ScholarLevel not found');

    return this.prisma.scholarLevel.update({
      where: { id: scholarLevelId },
      data: { ...dto },
    });
  }

  async deleteScholarLevelById(scholarLevelId: number) {
    const scholarLevel = await this.prisma.scholarLevel.findUnique({
      where: { id: scholarLevelId },
    });
    if (!scholarLevel) throw new NotFoundException('ScholarLevel not found');

    return this.prisma.scholarLevel.delete({ where: { id: scholarLevelId } });
  }
}
