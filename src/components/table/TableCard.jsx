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
          level={TableContainerLevel.FINAL_MERGED_DATAFRAME}
          data={filteredRow}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <TableWrapper
          level={TableContainerLevel.MATCHED_RECORDS}
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
        maxHeight: 300,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 0.5, sm: 1 },
          borderRadius: 2,
          boxShadow: 1,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.25rem" },
            color: "primary.main",
          }}
          gutterBottom
        >
          {level} ({data.length})
        </Typography>
      </Box>

      <ResultsTable data={data} />
    </Box>
  );
};

export default TableCard;
