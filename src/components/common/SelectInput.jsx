import React from "react";
import { MenuItem, TextField } from "@mui/material";

const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <TextField
      select
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
      margin="normal"
    >
      {options.map((option, index) => (
        <MenuItem key={`${option}_${index}`} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;
