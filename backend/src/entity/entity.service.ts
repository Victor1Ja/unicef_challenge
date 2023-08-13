import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EntityDto, EditEntityDto } from './dto/entity.dto';

@Injectable()
export class EntityService {
  constructor(private prisma: PrismaService) {}

  getAllEntities() {
    return this.prisma.entity.findMany();
  }

  createEntity(dto: EntityDto) {
    return this.prisma.entity.create({ data: { ...dto } });
  }

  async getEntityById(entityId: number) {
    const entity = await this.prisma.entity.findUnique({
      where: { id: entityId },
    });
    if (!entity) throw new NotFoundException('Entity not found');
    return entity;
  }

  async editEntityById(entityId: number, dto: EditEntityDto) {
    const entity = await this.prisma.entity.findUnique({
      where: { id: entityId },
    });
    if (!entity) throw new NotFoundException('Entity not found');

    return this.prisma.entity.update({
      where: { id: entityId },
      data: { ...dto },
    });
  }

  async deleteEntityById(entityId: number) {
    const entity = await this.prisma.entity.findUnique({
      where: { id: entityId },
    });
    if (!entity) throw new NotFoundException('Entity not found');

    return this.prisma.entity.delete({ where: { id: entityId } });
  }
}
