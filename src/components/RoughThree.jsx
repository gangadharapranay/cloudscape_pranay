import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export default function RoughThree() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Master Configuration" />
        <Tab label="Slave Configuration" />
      </Tabs>

      {/* Master Configuration Panel */}
      {value === 0 && <MasterConfigurationTab />}

      {/* Slave Configuration Panel */}
      {value === 1 && <SlaveConfigurationTab />}
    </Box>
  );
}

function MasterConfigurationTab() {
  const [clusterName, setClusterName] = React.useState('');
  const [jbossUsername, setJbossUsername] = React.useState('');
  const [jbossPassword, setJbossPassword] = React.useState('');
  const [masterIP, setMasterIP] = React.useState('');
  const [masterUsername, setMasterUsername] = React.useState('');
  const [masterPassword, setMasterPassword] = React.useState('');
  const [openMasterModal, setOpenMasterModal] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      clusterName,
      jbossUsername,
      jbossPassword,
      masterIP,
      masterUsername,
      masterPassword,
    };
    console.log('Master Form Data:', formData);
    setOpenMasterModal(true);
  };

  const handleCloseMasterModal = () => {
    setOpenMasterModal(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Master Configuration
      </Typography>
      <TextField
        label="Cluster Name"
        variant="outlined"
        value={clusterName}
        onChange={(e) => setClusterName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="JBoss Username"
        variant="outlined"
        value={jbossUsername}
        onChange={(e) => setJbossUsername(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="JBoss Password"
        variant="outlined"
        type="password"
        value={jbossPassword}
        onChange={(e) => setJbossPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Master IP"
        variant="outlined"
        value={masterIP}
        onChange={(e) => setMasterIP(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Master Username"
        variant="outlined"
        value={masterUsername}
        onChange={(e) => setMasterUsername(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <TextField
        label="Master Password"
        variant="outlined"
        type="password"
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Save Master Configuration
      </Button>

      {/* Master Modal */}
      <Modal
        open={openMasterModal}
        onClose={handleCloseMasterModal}
        aria-labelledby="master-modal-title"
        aria-describedby="master-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="master-modal-title" variant="h6" component="h2">
            Master Configuration Modal
          </Typography>
          <Typography id="master-modal-description" sx={{ mt: 2 }}>
            Master Configuration details saved.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

function SlaveConfigurationTab() {
  const [noOfSlaves, setNoOfSlaves] = React.useState(0);
  const [slaveConfigurations, setSlaveConfigurations] = React.useState([]);
  const [currentSlaveIndex, setCurrentSlaveIndex] = React.useState(0);
  const [slaveIP, setSlaveIP] = React.useState('');
  const [slaveUsername, setSlaveUsername] = React.useState('');
  const [slavePassword, setSlavePassword] = React.useState('');
  const [openSlaveModal, setOpenSlaveModal] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      noOfSlaves,
    };
    console.log('Slave Form Data:', formData);
    setSlaveConfigurations(new Array(parseInt(noOfSlaves)).fill({}));
    setOpenSlaveModal(true);
  };

  const handleCloseSlaveModal = () => {
    setOpenSlaveModal(false);
  };

  const handleSaveConfiguration = (e) => {
    e.preventDefault();
    const updatedSlaveConfigurations = [...slaveConfigurations];
    updatedSlaveConfigurations[currentSlaveIndex] = {
      slaveIP,
      slaveUsername,
      slavePassword,
    };
    setSlaveConfigurations(updatedSlaveConfigurations);

    if (currentSlaveIndex === parseInt(noOfSlaves) - 1) {
      setOpenSlaveModal(false);
    } else {
      setCurrentSlaveIndex(currentSlaveIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentSlaveIndex > 0) {
      const updatedSlaveConfigurations = [...slaveConfigurations];
      updatedSlaveConfigurations[currentSlaveIndex] = {
        slaveIP,
        slaveUsername,
        slavePassword,
      };
      setSlaveConfigurations(updatedSlaveConfigurations);
      setCurrentSlaveIndex(currentSlaveIndex - 1);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Slave Configuration
      </Typography>
      <TextField
        label="Number Of Slaves"
        variant="outlined"
        type="number"
        value={noOfSlaves}
        onChange={(e) => setNoOfSlaves(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Create Slaves
      </Button>

      {/* Slave Modal */}
      <Modal
        open={openSlaveModal}
        onClose={handleCloseSlaveModal}
        aria-labelledby="slave-modal-title"
        aria-describedby="slave-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="slave-modal-title" variant="h6" component="h2">
            Slave Configuration {currentSlaveIndex + 1} of {noOfSlaves}
          </Typography>
          <TextField
            label="Slave IP"
            variant="outlined"
            value={slaveIP}
            onChange={(e) => setSlaveIP(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Slave Username"
            variant="outlined"
            value={slaveUsername}
            onChange={(e) => setSlaveUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Slave Password"
            variant="outlined"
            type="password"
            value={slavePassword}
            onChange={(e) => setSlavePassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
            <Button onClick={handleSaveConfiguration} variant="contained">
              {currentSlaveIndex === parseInt(noOfSlaves) - 1
                ? 'Save All Configurations'
                : 'Save Configuration'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
