export interface SchoolInfoCleanedDto {
  schoolId: number;
  address?: string;
  latitude?: string;
  longitude?: string;
  geolocationAccuracy?: number;
  hasInternet?: boolean;
  internetSpeed?: number;
}

export interface EditSchoolInfoCleanedDto {
  address?: string;
  latitude?: string;
  longitude?: string;
  geolocationAccuracy?: number;
  hasInternet?: boolean;
  internetSpeed?: number;
}
