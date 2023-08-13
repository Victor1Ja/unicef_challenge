import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProvinceDto, EditProvinceDto } from './dto/province.dto';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  getAllProvinces() {
    return this.prisma.province.findMany();
  }

  createProvince(dto: ProvinceDto) {
    return this.prisma.province.create({ data: { ...dto } });
  }

  async getProvinceById(provinceId: number) {
    const province = await this.prisma.province.findUnique({
      where: { id: provinceId },
    });
    if (!province) throw new NotFoundException('Province not found');
    return province;
  }

  async editProvinceById(provinceId: number, dto: EditProvinceDto) {
    const province = await this.prisma.province.findUnique({
      where: { id: provinceId },
    });
    if (!province) throw new NotFoundException('Province not found');

    return this.prisma.province.update({
      where: { id: provinceId },
      data: { ...dto },
    });
  }

  async deleteProvinceById(provinceId: number) {
    const province = await this.prisma.province.findUnique({
      where: { id: provinceId },
    });
    if (!province) throw new NotFoundException('Province not found');

    return this.prisma.province.delete({ where: { id: provinceId } });
  }
}
