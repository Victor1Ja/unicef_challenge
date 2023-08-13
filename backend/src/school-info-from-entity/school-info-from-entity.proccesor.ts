import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchoolInfoCleanedDto } from '../school-info-cleaned/dto/school-info-cleaned.dto';
import { EntityType } from 'src/entity/dto';
import { getCenter, getDistance } from 'geolib';
import { calculateConfidenceInterval, calculateMean } from 'src/utils/math';

@Processor('schoolInfoCleaned')
export class SchoolInfoProcessor {
  private readonly logger = new Logger(SchoolInfoProcessor.name);

  constructor(private prisma: PrismaService) {
    this.logger.debug('SchoolInfoProcessor instantiated');
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
