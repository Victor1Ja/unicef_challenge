import {
  EditSchoolInfoCleanedDto,
  SchoolInfoCleanedDto,
} from '../models/SchoolInfoCleanedDto';
import { baseUrl, instance } from './instance';

const schoolInfoCleanedApi = {
  getAllSchoolInfoCleaned: () => instance.get(`${baseUrl}/school-info-cleaned`),

  createSchoolInfoCleaned: (dto: SchoolInfoCleanedDto) =>
    instance.post(`${baseUrl}/school-info-cleaned`, dto),

  getSchoolInfoCleanedById: (id: number) =>
    instance.get(`/${baseUrl}/school-info-cleaned/${id}`),

  editSchoolInfoCleanedById: (id: number, dto: EditSchoolInfoCleanedDto) =>
    instance.patch(`/${baseUrl}/school-info-cleaned/${id}`, dto),

  deleteSchoolInfoCleanedById: (id: number) =>
    instance.delete(`/${baseUrl}/school-info-cleaned/${id}`),
};

export default schoolInfoCleanedApi;
