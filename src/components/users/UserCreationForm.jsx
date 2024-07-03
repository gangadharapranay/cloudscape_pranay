// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import BaseAxios from './BaseAxios';

// const RequiredLabel = styled('label')({
//   display: 'inline-block',
//   width: '200px',
//   height: '24px',
//   '&::after': {
//     content: '"*"',
//     color: 'red',
//     marginLeft: '5px',
//   },
// });

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const UserCreationForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     password: '',
//     email: '',
//   });

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const validateUsername = (username) => {
//     if (username.length < 3 || username.length > 255) {
//       return 'Username must be between 3 and 255 characters';
//     }
//     return '';
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       return 'Password must be at least 8 characters long and can include alphanumeric and special characters';
//     }
//     return '';
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return 'Email is not valid';
//     }
//     return '';
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const usernameError = validateUsername(formData.username);
//     const passwordError = validatePassword(formData.password);
//     const emailError = validateEmail(formData.email);

//     if (usernameError || passwordError || emailError) {
//       setErrors({
//         username: usernameError,
//         password: passwordError,
//         email: emailError,
//       });
//       return;
//     }

//     BaseAxios.post('/users', formData)
//       .then(response => {
//         console.log('User created successfully:', response.data);
//         setSnackbarMessage('User created successfully');
//         setSnackbarOpen(true);
//         // Handle success, such as redirecting or displaying a success message
//       })
//       .catch(error => {
//         console.error('There was an error creating the user:', error);
//         // Handle error, such as displaying an error message
//       });
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '100%' },
//         maxWidth: '800px',
//         marginLeft: '0',
//         mt: 0,
//         p: 5,
//         borderRadius: '0px',
//         backgroundColor: 'white',
//         '& .form-label': {
//           display: 'inline-block',
//           width: '200px',
//           height: '24px',
//         },
//       }}
//       onSubmit={handleSubmit}
//       noValidate
//       autoComplete="off"
//     >
//       <Typography variant="h6" align="center" gutterBottom>
//         Create User
//       </Typography>

//       <div className="mb-3">
//         <RequiredLabel htmlFor="username">Username</RequiredLabel>
//         <TextField
//           type="text"
//           id="username"
//           fullWidth
//           required
//           value={formData.username}
//           onChange={handleChange}
//           error={!!errors.username}
//           helperText={errors.username}
//           InputProps={{
//             sx: { 
//               height: 40, 
//               backgroundColor: 'transparent',
//             },
//           }}
//         />
//       </div>
//       <div className="mb-3">
//         <RequiredLabel htmlFor="password">Password</RequiredLabel>
//         <TextField
//           type="password"
//           id="password"
//           variant="outlined"
//           fullWidth
//           required
//           value={formData.password}
//           onChange={handleChange}
//           error={!!errors.password}
//           helperText={errors.password}
//           InputProps={{
//             sx: { 
//               height: 40, 
//               backgroundColor: 'transparent',
//             },
//           }}
//         />
//       </div>
//       <div className="mb-3">
//         <RequiredLabel htmlFor="email">Email</RequiredLabel>
//         <TextField
//           type="email"
//           id="email"
//           aria-describedby="emailHelp"
//           fullWidth
//           required
//           value={formData.email}
//           onChange={handleChange}
//           error={!!errors.email}
//           helperText={errors.email}
//           InputProps={{
//             sx: { 
//               height: 40, 
//               backgroundColor: 'transparent',
//             },
//           }}
//         />
//       </div>
      
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//       >
//         Submit
//       </Button>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserCreationForm;
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import BaseAxios from '../env/BaseApi';
import { useNavigate } from 'react-router-dom';

const RequiredLabel = styled('label')({
  display: 'inline-block',
  width: '200px',
  height: '24px',
  '&::after': {
    content: '"*"',
    color: 'red',
    marginLeft: '5px',
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserCreationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateUsername = (username) => {
    if (username.length < 3 || username.length > 255) {
      return 'Username must be between 3 and 255 characters';
    }
    return '';
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long and can include alphanumeric and special characters';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const emailError = validateEmail(formData.email);

    if (usernameError || passwordError || emailError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        email: emailError,
      });
      return;
    }

    BaseAxios.post('/user', formData)
      .then(response => {
        console.log('User created successfully:', response.data);
        setSnackbarMessage('User created successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate("/users")
        
        // Handle success, such as redirecting or displaying a success message
      })
      .catch(error => {
        console.error('There was an error creating the user:', error);
        let message = 'There was an error creating the user';
        if (error.response && error.response.status === 409) {
          message = 'User already exists';
        }
        setSnackbarMessage(message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        // Handle error, such as displaying an error message
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
        maxWidth: '800px',
        marginLeft: '0',
        mt: 0,
        p: 5,
        borderRadius: '0px',
        backgroundColor: 'white',
        '& .form-label': {
          display: 'inline-block',
          width: '200px',
          height: '24px',
        },
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Create User
      </Typography>

      <div className="mb-3">
        <RequiredLabel htmlFor="username">Username</RequiredLabel>
        <TextField
          type="text"
          id="username"
          fullWidth
          required
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          InputProps={{
            sx: { 
              height: 40, 
              backgroundColor: 'transparent',
            },
          }}
        />
      </div>
      <div className="mb-3">
        <RequiredLabel htmlFor="password">Password</RequiredLabel>
        <TextField
          type="password"
          id="password"
          variant="outlined"
          fullWidth
          required
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            sx: { 
              height: 40, 
              backgroundColor: 'transparent',
            },
          }}
        />
      </div>
      <div className="mb-3">
        <RequiredLabel htmlFor="email">Email</RequiredLabel>
        <TextField
          type="email"
          id="email"
          aria-describedby="emailHelp"
          fullWidth
          required
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            sx: { 
              height: 40, 
              backgroundColor: 'transparent',
            },
          }}
        />
      </div>
      
      <Button
  type="submit"
  variant="contained"
  color="primary"
  sx={{ width: '150px' }}  // Adjust the width value as needed
>
  Submit
</Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserCreationForm;


