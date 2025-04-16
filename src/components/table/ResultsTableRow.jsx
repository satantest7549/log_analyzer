import React, { useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { createBugRequest } from "../../redux";
import { tableHeader } from "../../constants";
import { cellStyle, getColumnStyle, indexCellStyle } from "./styles";
import TableCellWithTooltip from "./TableCellWithTooltip";
import AppButton from "../common/AppButton";
import BugFormModal from "../BugFormModal";

const ResultsTableRow = ({ idx, row, keys, isLoading, setClickedRowIndex }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreateBug = () => {
    setClickedRowIndex(idx);
    // dispatch(createBugRequest(row));
    setModalOpen(true);
  };

  const hasHistoricalSolution = !!row[tableHeader.HISTORICAL_SOLUTION]
    ?.toString()
    .trim();

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: hasHistoricalSolution ? "#e3f2fd" : "inherit",
        }}
      >
        <TableCell sx={indexCellStyle}>{idx + 1}</TableCell>
        {keys.map((key) => {
          return (
            <TableCellWithTooltip
              key={key}
              value={row[key]}
              customStyle={getColumnStyle(key)}
            />
          );
        })}
        <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
          <AppButton
            onClick={handleCreateBug}
            variant="contained"
            sx={{ minWidth: 90 }}
            loading={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </AppButton>
        </TableCell>
      </TableRow>
      <BugFormModal
        data={row}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ResultsTableRow;
