import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import schoolInfoFromEntityApi from '../../api/SchoolInfoFromEntityApi';
import { SchoolInfoFromEntityDto } from '../../models/SchoolInfoFromEntityDto';
import AddSchoolInfoDialog from './AddSchoolInfoFromEntityDialog';

export default function SchoolInfoFromEntityPage() {
  const [addDialog, setAddDialog] = useState(false);
  const [force, setForce] = useState(0);
  const [schoolInfoList, setSchoolInfoList] = useState<
    Array<SchoolInfoFromEntityDto>
  >([]);
  const { getAllSchoolInfoFromEntity } = schoolInfoFromEntityApi;

  useEffect(() => {
    // Fetch the data from your API or source
    const fetchData = async () => {
      console.log('fetching data');
      const response = await getAllSchoolInfoFromEntity();
      console.log({ response });
      setSchoolInfoList(response.data);
    };
    fetchData();
  }, [force]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School ID</TableCell>
              <TableCell>Entity ID</TableCell>
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
                <TableCell>{schoolInfo.entityId}</TableCell>
                <TableCell>{schoolInfo.address}</TableCell>
                <TableCell>{schoolInfo.latitude}</TableCell>
                <TableCell>{schoolInfo.longitude}</TableCell>
                <TableCell>{schoolInfo.hasInternet ? 'Yes' : 'No'}</TableCell>
                <TableCell>{schoolInfo.internetSpeed || 'N/A'}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                onClick={() => setAddDialog(true)}
                align="center"
                sx={{ alignContent: 'center', alignItems: 'center' }}
                variant="footer"
                colSpan={7}>
                <Button> Add School Info From Entity</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <AddSchoolInfoDialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        onAdd={() => setForce(force + 1)}
      />
    </>
  );
}
