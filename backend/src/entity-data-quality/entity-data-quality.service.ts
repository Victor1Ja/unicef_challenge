import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EntityDataQualityDto,
  EditEntityDataQualityDto,
} from './dto/entity-data-quality.dto';

@Injectable()
export class EntityDataQualityService {
  constructor(private prisma: PrismaService) {}

  getAllEntityDataQualities() {
    return this.prisma.entityDataQuality.findMany();
  }

  createEntityDataQuality(dto: EntityDataQualityDto) {
    return this.prisma.entityDataQuality.create({ data: { ...dto } });
  }

  async getEntityDataQualityById(entityDataQualityId: number) {
    const entityDataQuality = await this.prisma.entityDataQuality.findUnique({
      where: { entityId: entityDataQualityId },
    });
    if (!entityDataQuality)
      throw new NotFoundException('EntityDataQuality not found');
    return entityDataQuality;
  }

  async editEntityDataQualityById(
    entityDataQualityId: number,
    dto: EditEntityDataQualityDto,
  ) {
    const entityDataQuality = await this.prisma.entityDataQuality.findUnique({
      where: { entityId: entityDataQualityId },
    });
    if (!entityDataQuality)
      throw new NotFoundException('EntityDataQuality not found');

    return this.prisma.entityDataQuality.update({
      where: { entityId: entityDataQualityId },
      data: { ...dto },
    });
  }

  async deleteEntityDataQualityById(entityDataQualityId: number) {
    const entityDataQuality = await this.prisma.entityDataQuality.findUnique({
      where: { entityId: entityDataQualityId },
    });
    if (!entityDataQuality)
      throw new NotFoundException('EntityDataQuality not found');

    return this.prisma.entityDataQuality.delete({
      where: { entityId: entityDataQualityId },
    });
  }
}
