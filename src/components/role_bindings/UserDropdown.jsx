import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import BaseAxios from '../env/BaseApi'; // Import the axios instance

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserSelectDropdown() {
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [personName, setPersonName] = React.useState([]);
  const [dataFetched, setDataFetched] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await BaseAxios.get('/users');
      setUsers(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(value);
    setPersonName(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Users</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedUsers}
          onChange={handleChange}
          input={<OutlinedInput label="Select Users" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {dataFetched &&
            users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                <Checkbox checked={selectedUsers.indexOf(user.id) > -1} />
                <ListItemText primary={user.username} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
