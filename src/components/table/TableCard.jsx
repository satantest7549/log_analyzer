import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { TableContainerLevel, tableHeader } from "../../constants";

import ResultsTable from "./ResultsTable";

const TableCard = () => {
  const finalAnalyzedData = useSelector((state) => state.analyze.analyzeData);

  const filteredRow = finalAnalyzedData.filter(
    (item) => item[tableHeader.HISTORICAL_SOLUTION].trim() !== ""
  );

  return (
    <Grid container spacing={2} justifyContent="center" mt={5}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <TableWrapper
          level={TableContainerLevel.MATCHED_RECORDS}
          // level={TableContainerLevel.FINAL_MERGED_DATAFRAME}
          data={filteredRow}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <TableWrapper
          // level={TableContainerLevel.MATCHED_RECORDS}
          level={TableContainerLevel.FINAL_MERGED_DATAFRAME}
          data={finalAnalyzedData}
        />
      </Grid>
    </Grid>
  );
};

const TableWrapper = ({ level, data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        maxHeight: 400,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        // overflow: "auto",
        boxShadow: 3,
        borderRadius: 2,
        p: 1,
        // border: "2px solid black",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          // backgroundColor: "primary.light",
          p: 1,
          borderRadius: 2,
          boxShadow: data.length > 0 ? 1 : 0,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.25rem" },
            color: "primary.main",
            // color: "primary.contrastText",
            textAlign: "center",
          }}
          gutterBottom
        >
          {level} ({data.length})
        </Typography>
      </Box>

      {data.length > 0 && (
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: 300,
            "&::-webkit-scrollbar": {
              height: 8,
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <ResultsTable data={data} />
        </Box>
      )}

      {/* <ResultsTable data={data} /> */}
    </Box>
  );
};

export default TableCard;
