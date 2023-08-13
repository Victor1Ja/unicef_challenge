import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
import {
  EditSchoolInfoFromEntityDto,
  SchoolInfoFromEntityDto,
} from './dto/school-info-from-entity.dto';

@Injectable()
export class SchoolInfoFromEntityService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('schoolInfoCleaned') private readonly schoolInfoQueue: Queue,
  ) {}

  getAllSchoolInfoFromEntity() {
    return this.prisma.schoolInfoFromEntity.findMany();
  }

  async createSchoolInfoFromEntity(dto: SchoolInfoFromEntityDto) {
    const schoolInfo = await this.prisma.schoolInfoFromEntity.create({
      data: { ...dto },
    });
    this.schoolInfoQueue.add('newSchoolData', { id: schoolInfo.schoolId });
    this.schoolInfoQueue.add('dataQuality', { id: schoolInfo.entityId });
    return schoolInfo;
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

  forceDataMessage(id: number) {
    this.schoolInfoQueue.add('dataQuality', { id });
    console.log('id', id);
    return `Message sent to queue for dataQuality ${id}`;
  }
  forceSchoolMessage(id: number) {
    this.schoolInfoQueue.add('newSchoolData', { id });
    return `Message sent to queue for newSchoolData ${id}`;
  }
}
