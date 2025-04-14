import React from "react";
import { TextField } from "@mui/material";

const DateTimeInput = ({
  label,
  value,
  onChange,
  fullWidth = true,
  margin = "normal",
}) => {
  return (
    <TextField
      label={label}
      type="datetime-local"
      fullWidth={fullWidth}
      margin={margin}
      InputLabelProps={{ shrink: true }}
      value={value}
      onChange={onChange}
    />
  );
};

export default DateTimeInput;
