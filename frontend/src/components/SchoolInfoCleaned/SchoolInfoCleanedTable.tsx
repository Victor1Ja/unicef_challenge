import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import schoolInfoCleanedApi from '../../api/SchoolInfoCleanedApi';
import { SchoolInfoCleanedDto } from '../../models/SchoolInfoCleanedDto';

export default function SchoolInfoCleanedPage() {
  const [schoolInfoList, setSchoolInfoList] = useState<
    Array<SchoolInfoCleanedDto>
  >([]);
  const { getAllSchoolInfoCleaned } = schoolInfoCleanedApi;

  useEffect(() => {
    // Fetch the data from your API or source
    const fetchData = async () => {
      console.log('fetching data');
      const response = await getAllSchoolInfoCleaned();
      console.log(response);
      setSchoolInfoList(response);
    };
    fetchData();
  }, [getAllSchoolInfoCleaned]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Has Internet</TableCell>
            <TableCell>Internet Speed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schoolInfoList.map(schoolInfo => (
            <TableRow key={schoolInfo.schoolId}>
              <TableCell>{schoolInfo.schoolId}</TableCell>
              <TableCell>{schoolInfo.address}</TableCell>
              <TableCell>{schoolInfo.latitude}</TableCell>
              <TableCell>{schoolInfo.longitude}</TableCell>
              <TableCell>{schoolInfo.hasInternet ? 'Yes' : 'No'}</TableCell>
              <TableCell>{schoolInfo.internetSpeed || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
