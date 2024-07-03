import React, { useEffect, useState } from 'react';
import BaseAxios from '../env/BaseApi'; // Import the axios instance
import FetchRoles from '../roles/FetchRoles';
import { MDBBtn } from 'mdb-react-ui-kit';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const RoleAssignment = () => {
  const [assignmentType, setAssignmentType] = useState(''); // State to track the selected assignment type
  const [data, setData] = useState([]); // State to hold fetched data (users or groups)
  const [selectedIds, setSelectedIds] = useState([]); // State to track selected user or group IDs
  const { roles, error } = FetchRoles();
  const [selectedRole, setSelectedRole] = useState(''); // State to track selected role
  const [dataFetched, setDataFetched] = useState(false); // State to track if data has been fetched

  const finalRoles = ['jboss-super-admin', 'jboss-admin', 'jboss-viewer']
  const filteredRoles = roles.filter(role => finalRoles.includes(role.name));
  console.log(filteredRoles)

  useEffect(() => {
    if (assignmentType) {
      fetchData();
    }
  }, [assignmentType]);

  const fetchData = async () => {
    const endpoint = assignmentType === 'users' ? '/users' : '/groups';
    try {
      const response = await BaseAxios.get(endpoint);
      setData(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error(`Error fetching ${assignmentType}:`, error);
    }
  };

  const handleSelectionChange = (event) => {
    const { target: { value } } = event;
    setSelectedIds(value.map(id => id.toString())); // Ensure all IDs are strings
    console.log(value); // Log selected values for verification or debugging
  };

  const handleDropdownClick = () => {
    if (!dataFetched) {
      fetchData();
    }
  };

  const handleAssignRole = async () => {
    const apiToAssign = assignmentType === 'users' ? `/assign-role/${selectedRole}` : `/add_role_to_group/${selectedRole}`;
    try {
      const response = await BaseAxios.post(apiToAssign, selectedIds);
      console.log('Response:', response); // Log the response for debugging
    } catch (error) {
      console.error('Error assigning role:', error);
      console.error('Error response:', error.response); // Log the error response for more details
    }
  };

  return (
    <div>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="users"
            checked={assignmentType === 'users'}
            onChange={() => {
              setAssignmentType('users');
              setData([]);
              setDataFetched(false);
            }}
          />
          Users
        </label>
        <label>
          <input
            type="radio"
            value="groups"
            checked={assignmentType === 'groups'}
            onChange={() => {
              setAssignmentType('groups');
              setData([]);
              setDataFetched(false);
            }}
          />
          Groups
        </label>
      </div>

      {assignmentType && (
        <div className="dropdown-container">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-checkbox-label">
              Select {assignmentType.slice(0, -1)}
            </InputLabel>
            <Select
              labelId="multiple-checkbox-label"
              id="multiple-checkbox"
              multiple
              value={selectedIds}
              onChange={handleSelectionChange}
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.map((value) =>
                  data.find((item) => item.id === value)[
                    assignmentType === 'users' ? 'username' : 'name'
                  ]
                ).join(', ')
              }
            >
              {data.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={selectedIds.indexOf(item.id) > -1} />
                  <ListItemText
                    primary={assignmentType === 'users' ? item.username : item.name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      <div className="d-flex align-items-center mt-3">
        <div className="dropdown me-3">
          <select
            className="form-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {filteredRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <MDBBtn color="info" size="sm" onClick={handleAssignRole}>
          Assign Role
        </MDBBtn>
      </div>
    </div>
  );
};

export default RoleAssignment;
