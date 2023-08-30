# Idea to Solve the Problem of Data Quality Assessment

## Entity-Relationship Model

- Entity(id, name, ParentEntityId, description, type)
- SchoolLevels(id, name, description)
- Country(id, name)
- Province(id, name)
- City(id, name)
- School(id, name, description, CityId)
- SchoolLevelBySchool(schoolId, levelId, description)
- SchoolInfoFromEntity(schoolId, entityId, address, latitude, longitude, hasInternet, internetSpeed)
- CleanedSchoolInfo(schoolId, address, latitude, longitude, geolocationAccuracy, hasInternet, internetSpeed)
- EntityDataQuality(entityId, addressQuality, geolocationQuality, hasInternetQuality, internetSpeedQuality)

## Assumptions (Cuba-specific)

- Information Sources:
  - School Institutions
  - Government Institutions (Municipality)
  - Internet Service Providers

- Flow of Information:
  - School institutions provide school details, mainly the name and address.
  - Internet service providers contribute connectivity information.

- Data Verification:
  - Obtained information is verified and matched.
  - Cleaned data is saved in CleanedSchoolInfo.

- Geolocation Calculation:
  - Midpoint and confidence interval are calculated.
  - Outliers are identified outside the interval.
  - Approximate school location is determined.

- Order of Importance:
  - Address: School Institution
  - Internet: ISP
  - Geographic Location: Calculated using all sources.

- Internet Speed & Connectivity:
  - Telecom company data is taken as truth.
  - Telecom data used over Ministry of Education's data.
  - Lowest internet speed considered for schools with multiple sources.

## Architecture Used

The architecture used for this solution was as follows:

- Backend: NestJS, a powerful Node.js framework.
- Frontend: ReactJS.
- Database: PostgreSQL.
- Queue Messaging: Redis.

PostgreSQL was used within a Docker container, and Redis was employed as the message queue. Messages are sent to this queue to process school information and entity data quality.



**Conclusion:**
Efficient data quality assessment and consolidation through a structured approach involving multiple data sources, verification, and calculated geolocation accuracy.

## How to Run the Project
Follow backend and frontend instructions to run the project.
