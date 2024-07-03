// src/components/ConfirmationModal.js

import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ConfirmationModal = ({ open, handleClose, handleConfirm, data, handleEdit }) => {
  const renderData = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <Box key={key} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{key}:</Typography>
            <Box sx={{ pl: 2 }}>
              {renderData(value)}
            </Box>
          </Box>
        );
      } else {
        return (
          <Box key={key} sx={{ display: 'flex', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
              {key}:
            </Typography>
            <Typography variant="body2">{value.toString()}</Typography>
          </Box>
        );
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
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
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          Confirmation
        </Typography>
        <Box
          id="confirmation-modal-description"
          sx={{
            mt: 2,
            bgcolor: "#f5f5f5",
            p: 2,
            borderRadius: "5px",
            maxHeight: "300px",
            overflowY: "auto",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
          }}
        >
          {renderData(data)}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleEdit} variant="outlined">
            Edit
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
