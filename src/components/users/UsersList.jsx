// import React, { useEffect, useState } from 'react';
// import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
// import BaseAxios from '../env/BaseApi'; // Import the axios instance
// import '../../assets/css/users/UsersList.css'; // Import your CSS file
// import EditUser from './EditUser'; // Import your EditUser component
// import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
// import { Link, useNavigate } from 'react-router-dom';

// const UsersList = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [userId, setUserId] = useState(null); // State to track which user ID is being edited
//   const [editUserShow, setEditUserShow] = useState(false); // State for showing/hiding the modal
//   const [currentUser, setCurrentUser] = useState(null); // State to hold current user data for editing
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await BaseAxios.get('/users');
//         setUsers(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filter users based on search query
//   const filteredUsers = users.filter(user =>
//     (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const handleEdit = (user) => {
//     setCurrentUser(user); // Set the user data to be edited
//     setEditUserShow(true); // Show the modal
//   };

//   const handleCloseEdit = () => {
//     setEditUserShow(false); // Hide the modal
//     setCurrentUser(null); // Clear current user data
//   };

  
//   const handleDeleteUser = async(userId) =>{
//     try {
//       const response = await BaseAxios.delete('/user/' + userId);
//       navigate("/users")
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   }

//   return (
//     <div>
//       {/* Search bar and create user button */}
//       <div className="search-bar-container">
//         <div className="search-bar">
//           <PersonSearchSharpIcon className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//        <Link to="/UserCreationForm"> <button type="button" class="btn btn-primary">Create User</button></Link>
//       </div>

//       {/* Users table */}
//       <MDBTable align='middle' className='users-table'>
//         <MDBTableHead>
//           <tr>
//             <th scope='col'>Username</th>
//             <th scope='col'>Email</th>
//             <th scope='col'>Firstname</th>
//             <th scope='col'>Lastname</th>
//             <th scope='col'>Actions</th>
//           </tr>
//         </MDBTableHead>
//         <MDBTableBody>
//           {filteredUsers.map(user => (
//             <tr key={user.id}>
//               <td>
//                 <div className='d-flex align-items-center'>
//                   <MDBIcon icon='user' className='me-2' />
//                   <div className='user-details'>
//                     <p className='fw-bold mb-1'>{user.username}</p>
//                   </div>
//                 </div>
//               </td>
//               <td>{user.email || 'N/A'}</td>
//               <td>{user.firstName || 'N/A'}</td>
//               <td>{user.lastName || 'N/A'}</td>
//               <td>
//                 <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                 <MDBBtn color='link' rounded size='sm' onClick={() => handleEdit(user)}>
//                   Edit
//                 </MDBBtn>
//               </td>
//             </tr>
//           ))}
//         </MDBTableBody>
//       </MDBTable>

//       {/* Render EditUser modal */}
//       {currentUser && (
//         <EditUser
//           userId={currentUser.id}
//           user={currentUser}
//           handleClose={handleCloseEdit}
//         />
//       )}
//     </div>
//   );
// };

// export default UsersList;
















import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  Table,
  Box,
  SpaceBetween,
  Button,
  TextFilter,
  Header,
  Pagination,
  CollectionPreferences
} from '@cloudscape-design/components';
import BaseAxios from './env/BaseApi';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editUserShow, setEditUserShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await BaseAxios.get('/users');
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.firstName && user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.lastName && user.lastName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditUserShow(true);
  };

  const handleCloseEdit = () => {
    setEditUserShow(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await BaseAxios.delete(`/user/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* <Link to="/UserCreationForm">
          <Button variant="primary">Create User</Button>
        </Link> */}
      </div>

      <Table
        renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
          `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
        }
        onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => item.username
        }}
        columnDefinitions={[
          {
            id: "username",
            header: "Username",
            cell: item => <a href={`/users/${item.id}`}>{item.username}</a>,
            sortingField: "username",
            isRowHeader: true
          },
          {
            id: "email",
            header: "Email",
            cell: item => item.email || 'N/A',
            sortingField: "email"
          },
          {
            id: "firstName",
            header: "Firstname",
            cell: item => item.firstName || 'N/A',
            sortingField: "firstName"
          },
          {
            id: "lastName",
            header: "Lastname",
            cell: item => item.lastName || 'N/A',
            sortingField: "lastName"
          },
          {
            id: "actions",
            header: "Actions",
            cell: item => (
              <>
                <Button onClick={() => handleDeleteUser(item.id)}>Delete</Button>
                <Button onClick={() => handleEdit(item)}>Edit</Button>
              </>
            )
          }
        ]}
        items={filteredUsers}
        loadingText="Loading users..."
        selectionType="multi"
        trackBy="id"
        wrapLines
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No users found</b>
              <Button>Create user</Button>
            </SpaceBetween>
          </Box>
        }
        filter={
          <TextFilter
            filteringPlaceholder="Find users"
            filteringText={searchQuery}
            onChange={(e) => setSearchQuery(e.detail.filteringText)}
          />
        }
        header={
          <Header counter={selectedItems.length ? `(${selectedItems.length}/10)` : "(10)"}>
            Users List
          </Header>
        }
        pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{
              pageSize: 10,
              contentDisplay: [
                { id: "username", visible: true },
                { id: "email", visible: true },
                { id: "firstName", visible: true },
                { id: "lastName", visible: true }
              ]
            }}
            pageSizePreference={{
              title: "Page size",
              options: [
                { value: 10, label: "10 users" },
                { value: 20, label: "20 users" }
              ]
            }}
          />
        }
      />
    </div>
  );
};

export default UsersList;
