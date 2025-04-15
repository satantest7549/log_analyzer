// import React from "react";
// import { TableHead, TableRow } from "@mui/material";
// import { tableHeader } from "../../constants";
// import TableCellWithTooltip from "./TableCellWithTooltip";
// import { getColumnStyle } from "./styles";

// const ResultsTableHeader = ({ keys }) => (
//   <TableHead>
//     <TableCellWithTooltip value={tableHeader.SERIAL_NUMBER} isHeader={true} />
//     {keys.map((key) => {
//       return (
//         <TableCellWithTooltip
//           key={key}
//           value={key}
//           isHeader={true}
//           customStyle={getColumnStyle(key)}
//         />
//       );
//     })}
//     <TableCellWithTooltip value={tableHeader.CREATE_BUG} isHeader={true} />
//   </TableHead>
// );

// export default ResultsTableHeader;

import React from "react";
import { TableHead, TableRow } from "@mui/material";
import { tableHeader } from "../../constants";
import TableCellWithTooltip from "./TableCellWithTooltip";
import { getColumnStyle } from "./styles";

const ResultsTableHeader = ({ keys }) => (
  <TableHead>
    {/* <TableRow> */}
      <TableCellWithTooltip value={tableHeader.SERIAL_NUMBER} isHeader={true} />
      {keys.map((key) => (
        <TableCellWithTooltip
          key={key}
          value={key}
          isHeader={true}
          customStyle={getColumnStyle(key)}
        />
      ))}
      <TableCellWithTooltip value={tableHeader.CREATE_BUG} isHeader={true} />
    {/* </TableRow> */}
  </TableHead>
);

export default ResultsTableHeader;
