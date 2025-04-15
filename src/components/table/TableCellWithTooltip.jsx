import React from "react";
import { TableCell, Tooltip } from "@mui/material";
import { cellStyle, headerCellStyle } from "./styles";

const TableCellWithTooltip = ({
  value,
  customStyle = {},
  isHeader = false,
}) => {
  const text = value.toString();
  const shouldShowTooltip = text.length > 20;

  const dynamicStyle = {
    ...(isHeader ? headerCellStyle : cellStyle),
    ...customStyle,
    whiteSpace: isHeader ? "normal" : "nowrap",
    textAlign: isHeader ? "center" : "left",
  };
  return shouldShowTooltip && !isHeader ? (
    <Tooltip title={text} arrow placement="top">
      <TableCell sx={dynamicStyle}>{text}</TableCell>
    </Tooltip>
  ) : (
    <TableCell sx={dynamicStyle}>{text}</TableCell>
  );
};

export default TableCellWithTooltip;
