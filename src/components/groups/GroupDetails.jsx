// import React, { useEffect, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import api from "./api";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UpgradeIcon from '@mui/icons-material/Upgrade';
// import '../styles/groupdetails.css'

// function GroupDetails() {
//   const { id } = useParams();
//   const [group, setGroup] = useState(null);
//   const navigate=useNavigate();

//   useEffect(() => {
//     // Fetch group details using the id
//     fetchGroupDetails(id).then((group) => setGroup(group));
//   }, [id]);

//   const fetchGroupDetails = async (id) => {
//     // Fetch group details from your API or state
//     // This is a placeholder example
//     const response = await api.get(
//       `/group-details/${id}`
//     );
//     return response.data;
//   };
//   const handleDelete =async () => {
    
//     try {
//         const res = await api.delete(`/delete-group/${id}`);
//         console.log(res);
//         navigate("/get-groups")
       
//       } catch (err) {
//         console.log(err);
//       }
//   };
//   const handleUpdate = () => {
//     console.log('update button clicked');
//   };

//   if (!group) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h3>Group Details</h3>
//       <p>
//         <strong>Name:</strong> {group.name}
//       </p>
//       {/* <p>
//         <strong>ID:</strong> {group.id}
//       </p> */}
//       <div className="button delete" onClick={handleDelete}>
//         <DeleteIcon />
//         <span>Delete</span>
//       </div>
//       <div className="button update" onClick={handleUpdate}>
//         <UpgradeIcon />
//         <span>Update Details</span>
//       </div>
//     </div>
//   );
// }

// export default GroupDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../env/BaseApi";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import '../../assets/css/groups/groupdetails.css';

function GroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null); 
  const [open, setOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch group details using the id
    fetchGroupDetails(id).then((group) => {
      setGroup(group);
      setUpdatedName(group.name); // Initialize updated name with the current group name
    });
  }, [id]);

  const fetchGroupDetails = async (id) => {
    const response = await api.get(`/group-details/${id}`);
    return response.data;
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/delete-group/${id}`);
      console.log(res);
      navigate("/get-groups");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const res = await api.put(`/update-group/${id}`, { name: updatedName });
      console.log(res);
      setGroup({ ...group, name: updatedName });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Group Details</h3>
      <p>
        <strong>Name:</strong> {group.name}
      </p>
      <div className="button delete" onClick={handleDelete}>
        <DeleteIcon />
        <span>Delete</span>
      </div>
      <div className="button update" onClick={handleUpdate}>
        <UpgradeIcon />
        <span>Update Details</span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default GroupDetails;
