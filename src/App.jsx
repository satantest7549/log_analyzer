import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import FilterFormDrawer from "./components/FilterForm";
import BugSuccessMessage from "./components/common/BugSuccessMessage";
import AppBarHeader from "./components/AppBarHeader";
import SummaryCard from "./components/SummaryCard";
import TableCard from "./components/table/TableCard";
import { useToast } from "./context";

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bugToastOpen, setBugToastOpen] = useState(false);
  const [analysisType, setAnalysisType] = useState(null);
  const showToast = useToast();

  // Redux selectors
  const {
    cstt: { loading: csttLoading, finalData: finalCsttData, error: csttError },
    analyze: {
      loading: analyzeLoading,
      error: analyzeError,
      analyzeData: finalAnalyzedData,
      customAnalyze: finalCustomAnalyzedData,
    },
    bug: { bugData: finalReaponseBugCreated, error: bugCreatedError },
  } = useSelector((state) => state);

  const loading = csttLoading || analyzeLoading;
  const error = csttError || analyzeError || bugCreatedError;

  useEffect(() => {
    // Handle error case: show a toast when there is an error
    if (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "An unexpected error occurred";
      showToast(errorMessage, "error");
    }
  }, [error, showToast]);

  // inside App component
  const prevCsttRef = useRef([]);
  const prevAnalyzedRef = useRef([]);
  const prevCustomAnalyzedRef = useRef(null);
  const prevBugRef = useRef(null);

  useEffect(() => {
    if (finalCsttData.length > 0 && finalCsttData !== prevCsttRef.current) {
      prevCsttRef.current = finalCsttData;
      showToast(`${finalCsttData.length} records fetched successfully!`);
    }

    if (
      finalAnalyzedData.length > 0 &&
      finalAnalyzedData !== prevAnalyzedRef.current
    ) {
      prevAnalyzedRef.current = finalAnalyzedData;
      showToast(
        `${finalAnalyzedData.length} matched records fetched successfully!`
      );
    }

    if (
      finalCustomAnalyzedData !== null &&
      finalCustomAnalyzedData !== prevCustomAnalyzedRef.current
    ) {
      prevCustomAnalyzedRef.current = finalCustomAnalyzedData;
      showToast("Analysed response fetched successfully!");
    }

    if (
      finalReaponseBugCreated !== null &&
      finalReaponseBugCreated !== prevBugRef.current
    ) {
      prevBugRef.current = finalReaponseBugCreated;
      setBugToastOpen(true);
    }
  }, [
    finalCsttData,
    finalAnalyzedData,
    finalCustomAnalyzedData,
    finalReaponseBugCreated,
    showToast,
  ]);
  return (
    <Box>
      {/* AppBar */}
      <AppBarHeader onMenuClick={() => setDrawerOpen(true)} />

      {/* Filter Drawer */}
      <FilterFormDrawer
        // onSubmit={handleSubmit}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setAnalysisType={setAnalysisType}
      />

      {/* Main Content Area */}
      {loading ? (
        <CircularProgress />
      ) : analysisType === "custom" ? (
        <SummaryCard data={finalCustomAnalyzedData} />
      ) : (
        finalAnalyzedData.length > 0 && <TableCard />
      )}

      {finalReaponseBugCreated && (
        <BugSuccessMessage
          bugId={finalReaponseBugCreated.id}
          open={bugToastOpen}
          onClose={() => {
            setBugToastOpen(false);
            // prevBugRef.current = null;
          }}
        />
      )}
    </Box>
  );
};

export default App;
