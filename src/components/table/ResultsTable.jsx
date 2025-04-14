import React, { useState } from "react";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { tableHeader } from "../../constants";
import ResultsTableHeader from "./ResultsTableHeader";
import ResultsTableRow from "./ResultsTableRow";
import BugFormModal from "../BugFormModal";
import { useSelector } from "react-redux";

const ResultsTable = ({ data }) => {
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const bugLoading = useSelector((state) => state.bug.loading);

  if (!data || data.length === 0) return null;

  const keys = Object.keys(data[0]).filter(
    (key) => key !== tableHeader.PAGE_NAME && key !== tableHeader.BUG_TITLE
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small" stickyHeader>
        <ResultsTableHeader keys={keys} />
        <TableBody>
          {data.map((row, idx) => (
            <ResultsTableRow
              key={idx}
              idx={idx}
              row={row}
              keys={keys}
              isLoading={bugLoading && clickedRowIndex === idx}
              setClickedRowIndex={setClickedRowIndex}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
