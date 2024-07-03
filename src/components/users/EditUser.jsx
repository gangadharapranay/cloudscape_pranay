import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Bootstrap components as needed
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS (adjust path as necessary)
import BaseAxios from '../env/BaseApi'; // Import the axios instance

const EditUser = ({ userId, user, handleClose }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user }); // State to manage updated user data

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value }); // Update the corresponding field in updatedUser
  };

  // Handle form submission for editing
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await BaseAxios.put(`/users/${userId}`, updatedUser);
      console.log('User updated successfully:', response.data);
      handleClose(); // Close the modal after saving changes
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstName" // Use a unique name for firstname
                value={updatedUser.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastName" // Use a unique name for lastname
                value={updatedUser.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit">Save changes</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditUser;
