import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

const RoughTwo = ({ prefix, onFinalValueChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const finalValue = `${prefix}${inputValue}`;
    onFinalValueChange(finalValue); // Notify parent component about the final value
  }, [inputValue, prefix, onFinalValueChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <TextField
        label="Enter value"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">{prefix}</InputAdornment>,
        }}
        sx={{ width: '100%' }}
      />
    </Box>
  );
};

export default RoughTwo;
