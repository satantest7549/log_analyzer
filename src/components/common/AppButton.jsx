import React from "react";
import { Button } from "@mui/material";

const AppButton = ({
  children,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "small",
  sx = {},
  ...props
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      sx={{ borderRadius: "8px", textTransform: "none", ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
