import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { getCenter, getDistance } from 'geolib';
import { EntityType } from 'src/entity/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { calculateConfidenceInterval, calculateMean } from 'src/utils/math';
import { SchoolInfoCleanedDto } from '../school-info-cleaned/dto/school-info-cleaned.dto';
import { EntityDataQualityDto } from 'src/entity-data-quality/dto/entity-data-quality.dto';
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
        schoolId: job.data['entityId'],
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
      if (distance < savedData.geolocationAccuracy) {
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
    return dataQuality;
  }

  @Process('newSchoolData')
  async handleNewSchoolData(job: Job) {
    const schoolData = await this.prisma.schoolInfoFromEntity.findMany({
      where: {
        schoolId: job.data['schoolId'],
      },
      include: {
        entity: true,
      },
    });
    const cleanedData = new SchoolInfoCleanedDto();
    cleanedData.schoolId = job.data['schoolId'];
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
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });

    const center = getCenter(geoLocations);

    if (!center) {
      this.logger.error(
        `No center found for schoolId: ${job.data['schoolId']}`,
      );
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

    if (!cleanedCenter) {
      this.logger.error(
        `No cleaned center found for schoolId: ${job.data['schoolId']}`,
      );
      return;
    }

    cleanedData.latitude = cleanedCenter.latitude.toString();
    cleanedData.longitude = cleanedCenter.longitude.toString();
    cleanedData.geolocationAccuracy = Math.abs(
      calculateMean(cleanedDistances) - lowerBound,
    );
  }
}
