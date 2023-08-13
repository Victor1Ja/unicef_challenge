import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CountryDto, EditCountryDto } from './dto/country.dto';

@Injectable()
export class CountryService {
  constructor(private prisma: PrismaService) {}

  getAllCountries() {
    return this.prisma.country.findMany();
  }

  createCountry(dto: CountryDto) {
    return this.prisma.country.create({ data: { ...dto } });
  }

  async getCountryById(countryId: number) {
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  async editCountryById(countryId: number, dto: EditCountryDto) {
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!country) throw new NotFoundException('Country not found');

    return this.prisma.country.update({
      where: { id: countryId },
      data: { ...dto },
    });
  }

  async deleteCountryById(countryId: number) {
    const country = await this.prisma.country.findUnique({
      where: { id: countryId },
    });
    if (!country) throw new NotFoundException('Country not found');

    return this.prisma.country.delete({ where: { id: countryId } });
  }
}
