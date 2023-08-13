import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { getCenter, getDistance } from 'geolib';
import { EntityDataQualityDto } from 'src/entity-data-quality/dto/entity-data-quality.dto';
import { EntityType } from 'src/entity/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateConfidenceInterval } from 'src/utils/math';
import { SchoolInfoCleanedDto } from '../school-info-cleaned/dto/school-info-cleaned.dto';
@Processor('schoolInfoCleaned')
export class SchoolInfoProcessor {
  private readonly logger = new Logger(SchoolInfoProcessor.name);

  constructor(private prisma: PrismaService) {
    this.logger.debug('SchoolInfoProcessor instantiated');
  }

  @Process('dataQuality')
  async handleDataQuality(job: Job) {
    const entityDataProvided = await this.prisma.schoolInfoFromEntity.findMany({
      where: {
        schoolId: job.data['id'],
      },
    });
    const dataQuality = new EntityDataQualityDto();
    const rightData = {
      address: 0,
      location: 0,
      hasInternet: 0,
      internetSpeed: 0,
    };
    for (let iter = 0; iter < entityDataProvided.length; iter++) {
      const data = entityDataProvided[iter];
      const savedData = await this.prisma.schoolInfoCleaned.findUnique({
        where: {
          schoolId: data.schoolId,
        },
      });

      if (data.address === savedData.address) {
        rightData.address++;
      }
      // location
      const distance = getDistance(
        {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        {
          latitude: savedData.latitude,
          longitude: savedData.longitude,
        },
      );
      console.log({ distance, sved: savedData.geolocationAccuracy });

      if (distance <= savedData.geolocationAccuracy) {
        rightData.location++;
      }

      if (data.hasInternet === savedData.hasInternet) {
        rightData.hasInternet++;
      }

      if (data.internetSpeed === savedData.internetSpeed) {
        rightData.internetSpeed++;
      }
    }
    dataQuality.addressQuality = rightData.address / entityDataProvided.length;
    dataQuality.geolocationQuality =
      rightData.location / entityDataProvided.length;
    dataQuality.hasInternetQuality =
      rightData.hasInternet / entityDataProvided.length;
    dataQuality.internetSpeed =
      rightData.internetSpeed / entityDataProvided.length;

    const exist = await this.prisma.entityDataQuality.findUnique({
      where: {
        entityId: job.data['id'],
      },
    });

    if (exist) {
      const data = await this.prisma.entityDataQuality.update({
        where: {
          entityId: job.data['id'],
        },
        data: dataQuality,
      });
      this.logger.debug(
        'Data Quality Updated for School: ' +
          job.data['id'] +
          ' ' +
          JSON.stringify(data),
      );
    } else {
      const data = await this.prisma.entityDataQuality.create({
        data: {
          entityId: job.data['id'],
          ...dataQuality,
        },
      });
      this.logger.debug(
        'Data Quality Created for School: ' +
          job.data['id'] +
          ' ' +
          JSON.stringify(data),
      );
    }
  }
  @Process('newSchoolData')
  async handleNewSchoolData(job: Job) {
    this.logger.debug('New School Data Job Started');
    const schoolData = await this.prisma.schoolInfoFromEntity.findMany({
      where: {
        schoolId: job.data['id'],
      },
      include: {
        entity: true,
      },
    });
    const cleanedData = new SchoolInfoCleanedDto();
    cleanedData.schoolId = job.data['id'];
    let internetFormIsp = false;
    let addressFromSchool = false;
    const geoLocations = [];
    schoolData.forEach((data) => {
      // Internet Connection
      if (data.entity.type == EntityType.INTERNET_PROVIDER) {
        internetFormIsp = true;
        // if one ISP does not provide internet to a school but other does still has internet
        cleanedData.hasInternet = cleanedData.hasInternet
          ? cleanedData.hasInternet
          : data.hasInternet;
        // Get the lowest speed connection provided
        cleanedData.internetSpeed =
          cleanedData.internetSpeed > data.internetSpeed
            ? data.internetSpeed
            : cleanedData.internetSpeed;
      } else {
        if (internetFormIsp) {
          cleanedData.hasInternet =
            cleanedData.hasInternet == undefined
              ? data.hasInternet
              : cleanedData.hasInternet;
          cleanedData.internetSpeed =
            cleanedData.internetSpeed === undefined
              ? data.internetSpeed
              : cleanedData.internetSpeed;
        }
      }
      // Address
      if (data.entity.type == EntityType.SCHOOL) {
        addressFromSchool = true;
        cleanedData.address = data.address;
      } else {
        if (addressFromSchool) {
          cleanedData.address =
            cleanedData.address == undefined
              ? data.address
              : cleanedData.address;
        }
      }
      // GeoLocation
      geoLocations.push({
        latitude: !Number.isNaN(parseFloat(data.latitude))
          ? parseFloat(data.latitude)
          : data.latitude,
        longitude: !Number.isNaN(parseFloat(data.longitude))
          ? parseFloat(data.longitude)
          : data.longitude,
      });
    });

    const center = getCenter(geoLocations);

    if (center === false) {
      this.logger.error(`No center found for schoolId: ${job.data['id']}`);
      return;
    }

    const distances = geoLocations.map((location) =>
      getDistance(center, location),
    );

    const [lowerBound, upperBound] = calculateConfidenceInterval(
      distances,
      0.95,
    );

    const cleanedDistances = geoLocations.filter(
      (_, index) =>
        distances[index] >= lowerBound && distances[index] <= upperBound,
    );

    const cleanedCenter = getCenter(cleanedDistances);

    if (cleanedCenter === false) {
      this.logger.error(
        `No cleaned center found for schoolId: ${job.data['id']}`,
      );
      return;
    }

    cleanedData.latitude = cleanedCenter.latitude.toString();
    cleanedData.longitude = cleanedCenter.longitude.toString();
    cleanedData.geolocationAccuracy = (upperBound - lowerBound) / 2;

    const exist = await this.prisma.schoolInfoCleaned.findUnique({
      where: { schoolId: job.data['id'] },
    });
    if (exist != null) {
      const data = await this.prisma.schoolInfoCleaned.update({
        where: {
          schoolId: job.data['id'],
        },
        data: cleanedData,
      });
      this.logger.debug(
        `SchoolInfoProcessor: Data updated ${job.data['id']} - ${JSON.stringify(
          data,
        )}`,
      );
    } else {
      const data = await this.prisma.schoolInfoCleaned.create({
        data: cleanedData,
      });
      this.logger.debug(
        `SchoolInfoProcessor: Data added ${job.data['id']} - ${JSON.stringify(
          data,
        )}`,
      );
    }
  }
}
