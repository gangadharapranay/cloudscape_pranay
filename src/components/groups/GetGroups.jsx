
import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../env/BaseApi';
import { Link } from 'react-router-dom';


Modal.setAppElement('#root'); // Set the app root for accessibility

const GetGroups = () => {
  const [groups, setGroups] = useState([{}]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await api.get('/groups');
      console.log(res.data);
      setGroups(res.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data.detail);
    }
  };

  const createGroup = async () => {
    try {
      const res = await api.post('/group', { name: newGroupName });
      console.log(res.data);
      handleSubmit();
      closeModal();
    } catch (err) {
      console.log(err);
      alert(err.response.data.detail);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    setNewGroupName(event.target.value);
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>Get Group Details</button>
      <button type="submit" onClick={openModal}>Create new Group</button>
      <h2>Groups</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {groups.map((group, index) => (
          <Link to={`/get-groups/${group.id}`} key={index} style={{ textDecoration: 'none' }}>
            <div
              onClick={() => handleGroupClick(group)}
              style={{
                border: '1px solid black',
                padding: '10px',
                margin: '10px',
                cursor: 'pointer',
                width: '200px',
                color: 'black',
              }}
            >
              Group name:<strong>{group.name}</strong><br/>
              Group id:<strong>{group.id}</strong>
            </div>
          </Link>
        ))}
      </div>
      {selectedGroup && (
        <div style={{ marginTop: '20px' }}>
          <h3>Group Details</h3>
          <p><strong>Name:</strong> {selectedGroup.name}</p>
          <p><strong>ID:</strong> {selectedGroup.id}</p>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Group Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Create New Group</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createGroup();
          }}
        >
          <label>
            Group Name:
            <input type="text" value={newGroupName} onChange={handleInputChange} />
          </label>
          <button type="submit">Create</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default GetGroups;
