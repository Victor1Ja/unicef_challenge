export interface SchoolInfoFromEntityDto {
  schoolId: number;
  entityId: number;
  address?: string;
  latitude?: string;
  longitude?: string;
  hasInternet?: boolean;
  internetSpeed?: number;
}

export class EditSchoolInfoFromEntityDto {
  address?: string;
  latitude?: string;
  longitude?: string;
  hasInternet?: boolean;
  internetSpeed?: number;
}
