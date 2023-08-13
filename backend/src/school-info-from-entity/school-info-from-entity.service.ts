import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  SchoolInfoFromEntityDto,
  EditSchoolInfoFromEntityDto,
} from './dto/school-info-from-entity.dto';

@Injectable()
export class SchoolInfoFromEntityService {
  constructor(private prisma: PrismaService) {}

  getAllSchoolInfoFromEntity() {
    return this.prisma.schoolInfoFromEntity.findMany();
  }

  createSchoolInfoFromEntity(dto: SchoolInfoFromEntityDto) {
    return this.prisma.schoolInfoFromEntity.create({ data: { ...dto } });
  }

  async getSchoolInfoFromEntityById(schoolInfoFromEntityId: number) {
    const schoolInfoFromEntity =
      await this.prisma.schoolInfoFromEntity.findUnique({
        where: { id: schoolInfoFromEntityId },
      });
    if (!schoolInfoFromEntity)
      throw new NotFoundException('SchoolInfoFromEntity not found');
    return schoolInfoFromEntity;
  }

  async editSchoolInfoFromEntityById(
    schoolInfoFromEntityId: number,
    dto: EditSchoolInfoFromEntityDto,
  ) {
    const schoolInfoFromEntity =
      await this.prisma.schoolInfoFromEntity.findUnique({
        where: { id: schoolInfoFromEntityId },
      });
    if (!schoolInfoFromEntity)
      throw new NotFoundException('SchoolInfoFromEntity not found');

    return this.prisma.schoolInfoFromEntity.update({
      where: { id: schoolInfoFromEntityId },
      data: { ...dto },
    });
  }

  async deleteSchoolInfoFromEntityById(schoolInfoFromEntityId: number) {
    const schoolInfoFromEntity =
      await this.prisma.schoolInfoFromEntity.findUnique({
        where: { id: schoolInfoFromEntityId },
      });
    if (!schoolInfoFromEntity)
      throw new NotFoundException('SchoolInfoFromEntity not found');

    return this.prisma.schoolInfoFromEntity.delete({
      where: { id: schoolInfoFromEntityId },
    });
  }
}
