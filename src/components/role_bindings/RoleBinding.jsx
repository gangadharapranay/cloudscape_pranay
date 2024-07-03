// import React, { useEffect, useState } from 'react';
// import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
// import BaseAxios from '../env/BaseApi'; // Import the axios instance
// import '../../assets/css/users/UsersList.css'; // Import your CSS file

// import { useNavigate } from 'react-router-dom';
// import FetchRoles from '../roles/FetchRoles'; // Import FetchRoles component/function

// const RoleBinding = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState(''); // State to track selected role for assignment
//   const { roles, error } = FetchRoles();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await BaseAxios.get('/users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleAssignRole =  (userId, roleId) => {
//     console.log("user ::", userId, "role", roleId)
//     // try {
//     //   const response = await BaseAxios.post(`/assign-role/${userId}`, {
//     //     role: roleId,
//     //   });
//     //   console.log(response.data); // Handle success response
//     //   // Optionally update UI to reflect role assignment
//     // } catch (error) {
//     //   console.error('Error assigning role:', error);
//     // }
//   };

//   return (
//     <div>
//       {/* Users table */}
//       <MDBTable align='middle' className='users-table'>
//         <MDBTableHead>
//           <tr>
//             <th scope='col'>Username</th>
//             <th scope='col'>Actions</th> {/* Add Actions column for edit and assign role */}
//           </tr>
//         </MDBTableHead>
//         <MDBTableBody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>
//                 <div className='d-flex align-items-center'>
//                   <MDBIcon icon='user' className='me-2' />
//                   <div className='user-details'>
//                     <p className='fw-bold mb-1'>{user.username}</p>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div className='d-flex align-items-center'>
//                   <div className='dropdown me-3'>
//                     <select
//                       className='form-select'
//                       value={selectedRole}
//                       onChange={(e) => setSelectedRole(e.target.value)}
//                     >
//                       <option value=''>Select Role</option>
//                       {roles.map(role => (
//                         <option key={role.id} value={role.id}>{role.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <MDBBtn color='info' size='sm' onClick={() => handleAssignRole(user.id, selectedRole)}>
//                     Assign Role
//                   </MDBBtn>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </MDBTableBody>
//       </MDBTable>
//     </div>
//   );
// };

// export default RoleBinding;










