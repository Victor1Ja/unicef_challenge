import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EntityModule } from './entity/entity.module';
import { SchoolModule } from './school/school.module';
import { CountryModule } from './country/country.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { SchoolInfoFromEntityModule } from './school-info-from-entity/school-info-from-entity.module';
import { SchoolInfoCleanedModule } from './school-info-cleaned/school-info-cleaned.module';
import { EntityDataQualityModule } from './entity-data-quality/entity-data-quality.module';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EntityModule,
    SchoolModule,
    CountryModule,
    ProvinceModule,
    CityModule,
    SchoolInfoFromEntityModule,
    SchoolInfoCleanedModule,
    EntityDataQualityModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
