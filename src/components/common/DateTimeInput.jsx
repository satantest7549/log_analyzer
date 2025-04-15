import React from "react";
import { TextField } from "@mui/material";

const DateTimeInput = ({
  label,
  value,
  onChange,
  fullWidth = true,
  margin = "normal",
  max,
}) => {
  return (
    <TextField
      label={label}
      type="datetime-local"
      fullWidth={fullWidth}
      margin={margin}
      value={value}
      onChange={onChange}
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: {
          max: max,
        },
      }}
    />
  );
};

export default DateTimeInput;
