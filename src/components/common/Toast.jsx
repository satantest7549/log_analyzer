import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({
  open,
  onClose,
  severity = "success",
  message,
  autoHideDuration = 3000,
  key,
}) => {
  return (
    <Snackbar
      key={key}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
