// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';

// const CreateCluster = () => {
//   const [clusterName, setClusterName] = useState('');
//   const [jbossUsername, setJbossUsername] = useState('');
//   const [jbossPassword, setJbossPassword] = useState('');
//   const [noOfSlaves, setNoOfSlaves] = useState(0);
//   const [slaveIP, setSlaveIP] = useState('');
//   const [slaveUsername, setSlaveUsername] = useState('');
//   const [slavePassword, setSlavePassword] = useState('');
//   const [currentSlaveIndex, setCurrentSlaveIndex] = useState(0);
//   const [slaveConfigurations, setSlaveConfigurations] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     // Pre-fill the modal inputs with the current values from slaveConfigurations
//     if (slaveConfigurations[currentSlaveIndex]) {
//       setSlaveIP(slaveConfigurations[currentSlaveIndex].slaveIP || '');
//       setSlaveUsername(slaveConfigurations[currentSlaveIndex].slaveUsername || '');
//       setSlavePassword(slaveConfigurations[currentSlaveIndex].slavePassword || '');
//     }
//   }, [currentSlaveIndex, slaveConfigurations]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = {
//       clusterName,
//       jbossUsername,
//       jbossPassword,
//       noOfSlaves,
//     };
//     console.log('Form Data:', formData);
//     setSlaveConfigurations(new Array(parseInt(noOfSlaves)).fill({}));
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleSaveConfiguration = (e) => {
//     e.preventDefault();
//     const updatedSlaveConfigurations = [...slaveConfigurations];
//     updatedSlaveConfigurations[currentSlaveIndex] = {
//       slaveIP,
//       slaveUsername,
//       slavePassword,
//     };
//     setSlaveConfigurations(updatedSlaveConfigurations);

//     if (currentSlaveIndex === parseInt(noOfSlaves) - 1) {
//       setOpen(false);
//     } else {
//       setCurrentSlaveIndex(currentSlaveIndex + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentSlaveIndex > 0) {
//       const updatedSlaveConfigurations = [...slaveConfigurations];
//       updatedSlaveConfigurations[currentSlaveIndex] = {
//         slaveIP,
//         slaveUsername,
//         slavePassword,
//       };
//       setSlaveConfigurations(updatedSlaveConfigurations);
//       setCurrentSlaveIndex(currentSlaveIndex - 1);
//     }
//   };

//   console.log("final:", slaveConfigurations);

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '40ch' },
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         mt: 5,
//       }}
//       onSubmit={handleSubmit}
//       noValidate
//       autoComplete="off"
//     >
//       <h2 style={{ textAlign: 'center', width: '100%' }}>Create Cluster</h2>
//       <TextField
//         id="clusterName"
//         label="Cluster Name"
//         variant="outlined"
//         value={clusterName}
//         onChange={(e) => setClusterName(e.target.value)}
//         required
//       />
//       <TextField
//         id="jbossUsername"
//         label="JBoss Username"
//         variant="outlined"
//         value={jbossUsername}
//         onChange={(e) => setJbossUsername(e.target.value)}
//         required
//       />
//       <TextField
//         id="jbossPassword"
//         label="JBoss Password"
//         variant="outlined"
//         type="password"
//         value={jbossPassword}
//         onChange={(e) => setJbossPassword(e.target.value)}
//         required
//       />
//       <TextField
//         id="noofslaves"
//         label="Number Of Slaves"
//         variant="outlined"
//         type="number"
//         value={noOfSlaves}
//         onChange={(e) => setNoOfSlaves(e.target.value)}
//         required
//       />

//       <TextField
//         id="installationPath"
//         label="installationPath"
//         variant="outlined"
//         type="text"
//         // value={noOfSlaves}
//         // onChange={(e) => setNoOfSlaves(e.target.value)}
//         required
//       />

//       {/* <h5>Master Configuration</h5> */}

//       <Button variant="contained" type="submit">
//         Create Cluster
//       </Button>

//       {noOfSlaves > 0 && (
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 400,
//               bgcolor: 'background.paper',
//               borderRadius: '10px',
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography id="modal-title" variant="h6" component="h2">
//               Slave Configuration {currentSlaveIndex + 1} of {noOfSlaves}
//             </Typography>
//             <TextField
//               id="slaveIP"
//               label="Slave IP"
//               variant="outlined"
//               fullWidth
//               value={slaveIP}
//               onChange={(e) => setSlaveIP(e.target.value)}
//               sx={{ mt: 2 }}
//               required
//             />
//             <TextField
//               id="slaveUsername"
//               label="Slave Username"
//               variant="outlined"
//               fullWidth
//               value={slaveUsername}
//               onChange={(e) => setSlaveUsername(e.target.value)}
//               sx={{ mt: 2 }}
//               required
//             />
//             <TextField
//               id="slavePassword"
//               label="Slave Password"
//               variant="outlined"
//               fullWidth
//               type="password"
//               value={slavePassword}
//               onChange={(e) => setSlavePassword(e.target.value)}
//               sx={{ mt: 2 }}
//               required
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//               <Button
//                 onClick={handleBack}
//                 disabled={currentSlaveIndex === 0}
//                 variant="outlined"
//               >
//                 Back
//               </Button>
//               <Button
//                 onClick={handleSaveConfiguration}
//                 variant="contained"
//               >
//                 {currentSlaveIndex === parseInt(noOfSlaves) - 1 ? 'Save All Configurations' : 'Save Configuration'}
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       )}
//     </Box>
//   );
// };

// export default CreateCluster;






// import React, { useState, useEffect, useRef } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import "../../assets/css/clusters/create_cluster.css";
// import { Checkbox, FormControlLabel } from "@mui/material";
// import axios from "axios";
// import ConfirmationModal from "../clusters/ConfirmationModal"; // Import the ConfirmationModal component

// const CreateCluster = () => {
//   const [clusterName, setClusterName] = useState("");
//   const [jbossUsername, setJbossUsername] = useState("");
//   const [jbossPassword, setJbossPassword] = useState("");
//   const [installationPath, setInstllationPath] = useState("");
//   const [masterUsername, setMasterUsername] = useState("");
//   const [masterPassword, setMasterPassword] = useState("");

//   const [noOfSlaves, setNoOfSlaves] = useState(0);
//   const [slaveConfigurations, setSlaveConfigurations] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // State for the confirmation modal
//   const [activeTab, setActiveTab] = useState(0);
//   const [savedConfigurations, setSavedConfigurations] = useState([]);

//   const [slaveIP, setSlaveIP] = useState("");
//   const [slaveUsername, setSlaveUsername] = useState("");
//   const [slavePassword, setSlavePassword] = useState("");

//   const [isChecked, setIsChecked] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const [missingFields, setMissingFields] = useState([]);

//   const [masterConfiguration, setMasterConfiguration] = useState({});

//   useEffect(() => {
//     // Initialize slave configurations array when noOfSlaves changes
//     setSlaveConfigurations(new Array(Number(noOfSlaves)).fill({}));
//   }, [noOfSlaves]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Collect missing fields
//     const missing = [];
//     if (!clusterName) missing.push("Cluster Name");
//     if (!jbossUsername) missing.push("JBoss Username");
//     if (!jbossPassword) missing.push("JBoss Password");
//     if (!installationPath) missing.push("Installation Path");
//     if (!masterUsername) missing.push("Master Username");
//     if (!masterPassword) missing.push("Master Password");
//     if (!noOfSlaves) missing.push("Number Of Slaves");
//     if (isChecked && !selectedFile) missing.push("SSL Certificate");

//     if (missing.length > 0) {
//       setMissingFields(missing);
//       return;
//     }

//     const updatedMasterConfigurations = {
//       jboss_username: jbossUsername,
//       jboss_password: jbossPassword,
//       host_ip: "192.168.1.100",
//       host_username: masterUsername,
//       host_password: masterPassword,
//     };
//     setMasterConfiguration(updatedMasterConfigurations);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleSaveConfiguration = () => {
//     const updatedConfigurations = [...slaveConfigurations];
//     updatedConfigurations[activeTab] = {
//       host_ip: slaveIP,
//       host_username: slaveUsername,
//       host_password: slavePassword,
//     };
//     setSlaveConfigurations(updatedConfigurations);
//     setSlaveIP("");
//     setSlaveUsername("");
//     setSlavePassword("");

//     if (activeTab === parseInt(noOfSlaves) - 1) {
//       setSavedConfigurations(updatedConfigurations);
//       setOpenModal(false);
//       setConfirmationModalOpen(true); // Open the confirmation modal
//     } else {
//       setActiveTab(activeTab + 1);
//       setSlaveIP(updatedConfigurations[activeTab + 1]?.host_ip || "");
//       setSlaveUsername(updatedConfigurations[activeTab + 1]?.host_username || "");
//       setSlavePassword(updatedConfigurations[activeTab + 1]?.host_password || "");
//     }
//   };

//   const formRequestBody = (up) => {
//     const finalObj = {
//       cluster_name: clusterName,
//       master: masterConfiguration,
//       slaves: up,
//     };
//     console.log("RequestBody :", finalObj);
//     handleCreateCluster(finalObj);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSlaveIP(slaveConfigurations[newValue]?.host_ip || "");
//     setSlaveUsername(slaveConfigurations[newValue]?.host_username || "");
//     setSlavePassword(slaveConfigurations[newValue]?.host_password || "");
//   };

//   const handleCheckboxChange = (event) => {
//     setIsChecked(event.target.checked);
//     if (!event.target.checked) {
//       setSelectedFile(null);
//     }
//   };

//   const fileInputRef = useRef(null);
//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleCreateCluster = async (RequestBody) => {
//     console.log("came::", RequestBody);
//     try {
//       const response = await axios.post(
//         "http://192.168.1.58:8000" + "/clusters_with_masters_and_slaves/",
//         RequestBody
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error.response);
//       console.log(error.responseText);
//     }
//   };

//   const handleConfirm = () => {
//     setConfirmationModalOpen(false);
//     formRequestBody(savedConfigurations);
//   };

//   const handleEdit = () => {
//     setConfirmationModalOpen(false);
//     setActiveTab(0);
//     setSlaveIP(slaveConfigurations[0]?.host_ip || "");
//     setSlaveUsername(slaveConfigurations[0]?.host_username || "");
//     setSlavePassword(slaveConfigurations[0]?.host_password || "");
//     setOpenModal(true);
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         "& > :not(style)": { m: 1, width: "90ch" },
//         display: "flex",
//         flexDirection: "column",
//         mt: 2,
//         ml: 3,
//       }}
//       onSubmit={handleSubmit}
//       noValidate
//       autoComplete="off"
//     >
//       <h3 style={{ textAlign: "", width: "100%" }}>Create Cluster</h3>
//       <TextField
//         id="clusterName"
//         className="formItem customTextField"
//         label="Cluster Name"
//         variant="outlined"
//         value={clusterName}
//         onChange={(e) => setClusterName(e.target.value)}
//         required
//         error={missingFields.includes("Cluster Name")}
//         helperText={
//           missingFields.includes("Cluster Name") && "Cluster Name is required"
//         }
//       />
//       <TextField
//         id="jbossUsername"
//         className="formItem customTextField"
//         label="JBoss Username"
//         variant="outlined"
//         value={jbossUsername}
//         onChange={(e) => setJbossUsername(e.target.value)}
//         required
//         error={missingFields.includes("JBoss Username")}
//         helperText={
//           missingFields.includes("JBoss Username") &&
//           "JBoss Username is required"
//         }
//       />
//       <TextField
//         id="jbossPassword"
//         className="formItem customTextField"
//         label="JBoss Password"
//         variant="outlined"
//         type="password"
//         value={jbossPassword}
//         onChange={(e) => setJbossPassword(e.target.value)}
//         required
//         error={missingFields.includes("JBoss Password")}
//         helperText={
//           missingFields.includes("JBoss Password") &&
//           "JBoss Password is required"
//         }
//       />

//       <TextField
//         id="installationPath"
//         className="formItem customTextField"
//         label="Installation Path"
//         variant="outlined"
//         type="text"
//         value={installationPath}
//         onChange={(e) => setInstllationPath(e.target.value)}
//         required
//         error={missingFields.includes("Installation Path")}
//         helperText={
//           missingFields.includes("Installation Path") &&
//           "Installation Path is required"
//         }
//       />

//       <TextField
//         id="masterUsername"
//         className="formItem customTextField"
//         label="Master Username"
//         variant="outlined"
//         type="text"
//         value={masterUsername}
//         onChange={(e) => setMasterUsername(e.target.value)}
//         required
//         error={missingFields.includes("Master Username")}
//         helperText={
//           missingFields.includes("Master Username") &&
//           "Master Username is required"
//         }
//       />
//       <TextField
//         id="masterPassword"
//         className="formItem customTextField"
//         label="Master Password"
//         variant="outlined"
//         type="password"
//         value={masterPassword}
//         onChange={(e) => setMasterPassword(e.target.value)}
//         required
//         error={missingFields.includes("Master Password")}
//         helperText={
//           missingFields.includes("Master Password") &&
//           "Master Password is required"
//         }
//       />

//       <TextField
//         id="noofslaves"
//         className="formItem customTextField"
//         label="Number Of Slaves"
//         variant="outlined"
//         type="number"
//         value={noOfSlaves}
//         onChange={(e) => setNoOfSlaves(e.target.value)}
//         required
//         error={missingFields.includes("Number Of Slaves")}
//         helperText={
//           missingFields.includes("Number Of Slaves") &&
//           "Number Of Slaves is required"
//         }
//       />

//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ width: "100%" }}
//       >
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isChecked}
//               onChange={handleCheckboxChange}
//               name="customCheckbox"
//             />
//           }
//           label="Configure SSL"
//           className="formItem customCheckbox"
//         />

//         {isChecked && (
//           <>
//             <input
//               type="file"
//               ref={fileInputRef}
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//               required
//             />
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="space-between"
//               sx={{ width: "100%" }}
//             >
//               <Button
//                 component="span"
//                 variant="contained"
//                 onClick={handleUploadClick}
//               >
//                 Upload SSL certificate
//               </Button>
//               {missingFields.includes("SSL Certificate") && (
//                 <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//                   SSL Certificate is required
//                 </Typography>
//               )}
//             </Box>
//           </>
//         )}
//       </Box>
//       <Button
//         variant="contained"
//         type="submit"
//         style={{ textAlign: "", width: "20%" }}
//       >
//         Create Cluster
//       </Button>

//       {noOfSlaves > 0 && (
//         <Modal
//           open={openModal}
//           onClose={handleCloseModal}
//           aria-labelledby="modal-title"
//           aria-describedby="modal-description"
//         >
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 600,
//               maxWidth: "90%",
//               bgcolor: "background.paper",
//               borderRadius: "10px",
//               boxShadow: 24,
//               p: 4,
//             }}
//           >
//             <Typography id="modal-title" variant="h6" component="h2">
//               Slave Configurations
//             </Typography>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant="scrollable"
//               scrollButtons="auto"
//             >
//               {[...Array(parseInt(noOfSlaves))].map((_, index) => (
//                 <Tab key={index} label={`Slave ${index + 1}`} />
//               ))}
//             </Tabs>
//             <div>
//               <TextField
//                 id="slaveIP"
//                 label="Slave IP"
//                 variant="outlined"
//                 fullWidth
//                 value={slaveIP}
//                 onChange={(e) => setSlaveIP(e.target.value)}
//                 sx={{ mt: 2 }}
//                 required
//               />
//               <TextField
//                 id="slaveUsername"
//                 label="Slave Username"
//                 variant="outlined"
//                 fullWidth
//                 value={slaveUsername}
//                 onChange={(e) => setSlaveUsername(e.target.value)}
//                 sx={{ mt: 2 }}
//                 required
//               />
//               <TextField
//                 id="slavePassword"
//                 label="Slave Password"
//                 variant="outlined"
//                 fullWidth
//                 type="password"
//                 value={slavePassword}
//                 onChange={(e) => setSlavePassword(e.target.value)}
//                 sx={{ mt: 2 }}
//                 required
//               />
//             </div>
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
//             >
//               <Button onClick={handleCloseModal} variant="outlined">
//                 Cancel
//               </Button>
//               <Button onClick={handleSaveConfiguration} variant="contained">
//                 {activeTab === parseInt(noOfSlaves) - 1
//                   ? "Save All Configurations"
//                   : "Save Configuration"}
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       )}

//       <ConfirmationModal
//         open={confirmationModalOpen}
//         handleClose={() => setConfirmationModalOpen(false)}
//         handleConfirm={handleConfirm}
//         handleEdit={handleEdit}
//         data={{
//           clusterName,
//           master: masterConfiguration,
//           slaves: savedConfigurations,
//           installationPath,
//           isChecked,
//           selectedFile: selectedFile?.name || "No file selected",
//         }}
//       />
//     </Box>
//   );
// };

// export default CreateCluster;







































import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../../assets/css/clusters/create_cluster.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import ConfirmationModal from "../clusters/ConfirmationModal"; // Import the ConfirmationModal component

const CreateCluster = () => {
  const [clusterName, setClusterName] = useState("");
  const [jbossUsername, setJbossUsername] = useState("");
  const [jbossPassword, setJbossPassword] = useState("");
  const [installationPath, setInstllationPath] = useState("");
  const [masterUsername, setMasterUsername] = useState("");
  const [masterPassword, setMasterPassword] = useState("");

  const [noOfSlaves, setNoOfSlaves] = useState(0);
  const [slaveConfigurations, setSlaveConfigurations] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // State for the confirmation modal
  const [activeTab, setActiveTab] = useState(0);
  const [savedConfigurations, setSavedConfigurations] = useState([]);

  const [slaveIP, setSlaveIP] = useState("");
  const [slaveUsername, setSlaveUsername] = useState("");
  const [slavePassword, setSlavePassword] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [missingFields, setMissingFields] = useState([]);

  const [masterConfiguration, setMasterConfiguration] = useState({});

  useEffect(() => {
    // Initialize slave configurations array when noOfSlaves changes
    const newSlaveConfigurations = new Array(Number(noOfSlaves)).fill({});
    for (let i = 0; i < slaveConfigurations.length; i++) {
      if (i < newSlaveConfigurations.length) {
        newSlaveConfigurations[i] = slaveConfigurations[i];
      }
    }
    setSlaveConfigurations(newSlaveConfigurations);
  }, [noOfSlaves]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect missing fields
    const missing = [];
    if (!clusterName) missing.push("Cluster Name");
    if (!jbossUsername) missing.push("JBoss Username");
    if (!jbossPassword) missing.push("JBoss Password");
    if (!installationPath) missing.push("Installation Path");
    if (!masterUsername) missing.push("Master Username");
    if (!masterPassword) missing.push("Master Password");
    if (!noOfSlaves) missing.push("Number Of Slaves");
    if (isChecked && !selectedFile) missing.push("SSL Certificate");

    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }

    const updatedMasterConfigurations = {
      jboss_username: jbossUsername,
      jboss_password: jbossPassword,
      host_ip: "192.168.1.100",
      host_username: masterUsername,
      host_password: masterPassword,
    };
    setMasterConfiguration(updatedMasterConfigurations);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveConfiguration = () => {
    const updatedConfigurations = [...slaveConfigurations];
    updatedConfigurations[activeTab] = {
      host_ip: slaveIP,
      host_username: slaveUsername,
      host_password: slavePassword,
    };
    setSlaveConfigurations(updatedConfigurations);
    setSlaveIP("");
    setSlaveUsername("");
    setSlavePassword("");

    if (activeTab === parseInt(noOfSlaves) - 1) {
      setSavedConfigurations(updatedConfigurations);
      setOpenModal(false);
      setConfirmationModalOpen(true); // Open the confirmation modal
    } else {
      setActiveTab(activeTab + 1);
      setSlaveIP(updatedConfigurations[activeTab + 1]?.host_ip || "");
      setSlaveUsername(updatedConfigurations[activeTab + 1]?.host_username || "");
      setSlavePassword(updatedConfigurations[activeTab + 1]?.host_password || "");
    }
  };

  const formRequestBody = (up) => {
    const finalObj = {
      cluster_name: clusterName,
      master: masterConfiguration,
      slaves: up,
    };
    console.log("RequestBody :", finalObj);
    handleCreateCluster(finalObj);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSlaveIP(slaveConfigurations[newValue]?.host_ip || "");
    setSlaveUsername(slaveConfigurations[newValue]?.host_username || "");
    setSlavePassword(slaveConfigurations[newValue]?.host_password || "");
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      setSelectedFile(null);
    }
  };

  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCreateCluster = async (RequestBody) => {
    console.log("came::", RequestBody);
    try {
      const response = await axios.post(
        "http://192.168.1.58:8000" + "/clusters_with_masters_and_slaves/",
        RequestBody
      );
      console.log(response);
    } catch (error) {
      console.log(error.response);
      console.log(error.responseText);
    }
  };

  const handleConfirm = () => {
    setConfirmationModalOpen(false);
    formRequestBody(savedConfigurations);
  };

  const handleEdit = () => {
    setConfirmationModalOpen(false);
    setActiveTab(0);
    setSlaveIP(slaveConfigurations[0]?.host_ip || "");
    setSlaveUsername(slaveConfigurations[0]?.host_username || "");
    setSlavePassword(slaveConfigurations[0]?.host_password || "");
    setOpenModal(true);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "90ch" },
        display: "flex",
        flexDirection: "column",
        mt: 2,
        ml: 3,
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <h3 style={{ textAlign: "", width: "100%" }}>Create Cluster</h3>
      <TextField
        id="clusterName"
        className="formItem customTextField"
        label="Cluster Name"
        variant="outlined"
        value={clusterName}
        onChange={(e) => setClusterName(e.target.value)}
        required
        error={missingFields.includes("Cluster Name")}
        helperText={
          missingFields.includes("Cluster Name") && "Cluster Name is required"
        }
      />
      <TextField
        id="jbossUsername"
        className="formItem customTextField"
        label="JBoss Username"
        variant="outlined"
        value={jbossUsername}
        onChange={(e) => setJbossUsername(e.target.value)}
        required
        error={missingFields.includes("JBoss Username")}
        helperText={
          missingFields.includes("JBoss Username") &&
          "JBoss Username is required"
        }
      />
      <TextField
        id="jbossPassword"
        className="formItem customTextField"
        label="JBoss Password"
        variant="outlined"
        type="password"
        value={jbossPassword}
        onChange={(e) => setJbossPassword(e.target.value)}
        required
        error={missingFields.includes("JBoss Password")}
        helperText={
          missingFields.includes("JBoss Password") &&
          "JBoss Password is required"
        }
      />

      <TextField
        id="installationPath"
        className="formItem customTextField"
        label="Installation Path"
        variant="outlined"
        type="text"
        value={installationPath}
        onChange={(e) => setInstllationPath(e.target.value)}
        required
        error={missingFields.includes("Installation Path")}
        helperText={
          missingFields.includes("Installation Path") &&
          "Installation Path is required"
        }
      />

      <TextField
        id="masterUsername"
        className="formItem customTextField"
        label="Master Username"
        variant="outlined"
        type="text"
        value={masterUsername}
        onChange={(e) => setMasterUsername(e.target.value)}
        required
        error={missingFields.includes("Master Username")}
        helperText={
          missingFields.includes("Master Username") &&
          "Master Username is required"
        }
      />
      <TextField
        id="masterPassword"
        className="formItem customTextField"
        label="Master Password"
        variant="outlined"
        type="password"
        value={masterPassword}
        onChange={(e) => setMasterPassword(e.target.value)}
        required
        error={missingFields.includes("Master Password")}
        helperText={
          missingFields.includes("Master Password") &&
          "Master Password is required"
        }
      />

      <TextField
        id="noofslaves"
        className="formItem customTextField"
        label="Number Of Slaves"
        variant="outlined"
        type="number"
        value={noOfSlaves}
        onChange={(e) => setNoOfSlaves(e.target.value)}
        required
        error={missingFields.includes("Number Of Slaves")}
        helperText={
          missingFields.includes("Number Of Slaves") &&
          "Number Of Slaves is required"
        }
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              name="customCheckbox"
            />
          }
          label="Configure SSL"
          className="formItem customCheckbox"
        />

        {isChecked && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Button
                component="span"
                variant="contained"
                onClick={handleUploadClick}
              >
                Upload SSL certificate
              </Button>
              {missingFields.includes("SSL Certificate") && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  SSL Certificate is required
                </Typography>
              )}
            </Box>
          </>
        )}
      </Box>
      <Button
        variant="contained"
        type="submit"
        style={{ textAlign: "", width: "20%" }}
      >
        Create Cluster
      </Button>

      {noOfSlaves > 0 && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              maxWidth: "90%",
              bgcolor: "background.paper",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Slave Configurations
            </Typography>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {[...Array(parseInt(noOfSlaves))].map((_, index) => (
                <Tab key={index} label={`Slave ${index + 1}`} />
              ))}
            </Tabs>
            <div>
              <TextField
                id="slaveIP"
                label="Slave IP"
                variant="outlined"
                fullWidth
                value={slaveIP}
                onChange={(e) => setSlaveIP(e.target.value)}
                sx={{ mt: 2 }}
                required
              />
              <TextField
                id="slaveUsername"
                label="Slave Username"
                variant="outlined"
                fullWidth
                value={slaveUsername}
                onChange={(e) => setSlaveUsername(e.target.value)}
                sx={{ mt: 2 }}
                required
              />
              <TextField
                id="slavePassword"
                label="Slave Password"
                variant="outlined"
                fullWidth
                type="password"
                value={slavePassword}
                onChange={(e) => setSlavePassword(e.target.value)}
                sx={{ mt: 2 }}
                required
              />
            </div>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button onClick={handleCloseModal} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveConfiguration} variant="contained">
                {activeTab === parseInt(noOfSlaves) - 1
                  ? "Save All Configurations"
                  : "Save Configuration"}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      <ConfirmationModal
        open={confirmationModalOpen}
        handleClose={() => setConfirmationModalOpen(false)}
        handleConfirm={handleConfirm}
        handleEdit={handleEdit}
        data={{
          clusterName,
          master: masterConfiguration,
          slaves: savedConfigurations,
          installationPath,
          isChecked,
          selectedFile: selectedFile?.name || "No file selected",
        }}
      />
    </Box>
  );
};

export default CreateCluster;



