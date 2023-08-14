import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import schoolInfoFromEntityApi from '../../api/SchoolInfoFromEntityApi';

export interface AddSchoolInfoDialogProps {
  open: boolean;
  onClose: () => void;
}
export default function AddSchoolInfoDialog({
  open,
  onClose,
}: AddSchoolInfoDialogProps) {
  const [schoolInfo, setSchoolInfo] = useState({
    schoolId: 0,
    entityId: 0,
    address: '',
    latitude: '',
    longitude: '',
    hasInternet: false,
    internetSpeed: 0,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleInputChange = event => {
    const { name, value } = event.target;
    setSchoolInfo(prevSchoolInfo => ({
      ...prevSchoolInfo,
      [name]: value,
    }));
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setSchoolInfo(prevSchoolInfo => ({
      ...prevSchoolInfo,
      [name]: checked,
    }));
  };

  const handleAddClick = () => {
    schoolInfoFromEntityApi
      .createSchoolInfoFromEntity(schoolInfo)
      .then(() => {
        onClose();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error('Error adding school info:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add School Information</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to add school information.
        </DialogContentText>
        <TextField
          label="School ID"
          name="schoolId"
          value={schoolInfo.schoolId}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Entity ID"
          name="entityId"
          value={schoolInfo.entityId}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="dense"
        />
        <TextField
          label="Address"
          name="address"
          value={schoolInfo.address}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Latitude"
          name="latitude"
          value={schoolInfo.latitude}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Longitude"
          name="longitude"
          value={schoolInfo.longitude}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Has Internet"
          name="hasInternet"
          value={schoolInfo.hasInternet}
          onChange={handleCheckboxChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Internet Speed"
          name="internetSpeed"
          value={schoolInfo.internetSpeed}
          onChange={handleInputChange}
          type="number"
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
