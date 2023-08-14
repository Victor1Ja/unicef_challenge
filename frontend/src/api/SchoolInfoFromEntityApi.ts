import {
  EditSchoolInfoFromEntityDto,
  SchoolInfoFromEntityDto,
} from '../models/SchoolInfoFromEntityDto';
import { baseUrl, instance } from './instance';

const schoolInfoFromEntityApi = {
  getAllSchoolInfoFromEntity: () =>
    instance.get(`${baseUrl}/school-info-from-entity`),

  createSchoolInfoFromEntity: (dto: SchoolInfoFromEntityDto) =>
    instance.post(`${baseUrl}/school-info-from-entity`, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  getSchoolInfoFromEntityById: (id: number) =>
    instance.get(`${baseUrl}/school-info-from-entity/${id}`),

  editSchoolInfoFromEntityById: (
    id: number,
    dto: EditSchoolInfoFromEntityDto
  ) => instance.patch(`${baseUrl}/school-info-from-entity/${id}`, dto),

  deleteSchoolInfoFromEntityById: (id: number) =>
    instance.delete(`${baseUrl}/school-info-from-entity/${id}`),

  forceSchoolMessage: (id: number) =>
    instance.get(`${baseUrl}/school-info-from-entity/forceSchoolMessage/${id}`),

  forceQuality: (id: number) =>
    instance.get(`${baseUrl}/school-info-from-entity/forceQuality/${id}`),
};

export default schoolInfoFromEntityApi;
