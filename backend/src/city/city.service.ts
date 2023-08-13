import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CityDto, EditCityDto } from './dto/city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  getAllCities() {
    return this.prisma.city.findMany();
  }

  createCity(dto: CityDto) {
    return this.prisma.city.create({ data: { ...dto } });
  }

  async getCityById(cityId: number) {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async editCityById(cityId: number, dto: EditCityDto) {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new NotFoundException('City not found');

    return this.prisma.city.update({
      where: { id: cityId },
      data: { ...dto },
    });
  }

  async deleteCityById(cityId: number) {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new NotFoundException('City not found');

    return this.prisma.city.delete({ where: { id: cityId } });
  }
}
