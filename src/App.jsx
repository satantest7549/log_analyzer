import "./App.css";
import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCsttDataRequest } from "./redux";
import FilterFormDrawer from "./components/FilterForm";
import BugSuccessMessage from "./components/common/BugSuccessMessage";
import AppBarHeader from "./components/AppBarHeader";
import Toast from "./components/common/Toast";
import SummaryCard from "./components/SummaryCard";
import TableCard from "./components/table/TableCard";
import ErrorCardPage from "./components/common/ErrorCardPage";

const App = () => {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bugToastOpen, setBugToastOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [analysisType, setAnalysisType] = useState(null);

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
  }, [error]);

  useEffect(() => {
    if (finalCsttData.length > 0) {
      showToast(`${finalCsttData.length} records fetched successfully!`);
    }
    if (finalAnalyzedData.length > 0) {
      showToast(
        `${finalAnalyzedData.length} matched records fetched successfully!`
      );
    }
    if (finalCustomAnalyzedData !== null) {
      showToast("Analysed response fetched successfully!");
    }

    if (finalReaponseBugCreated !== null) {
      setBugToastOpen(true);
    }
  }, [
    finalCsttData,
    finalAnalyzedData,
    finalCustomAnalyzedData,
    finalReaponseBugCreated,
  ]);

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = ({ appName, errorModule, fromDateTime, toDateTime }) => {
    setAnalysisType(null);
    dispatch(
      fetchCsttDataRequest({ appName, errorModule, fromDateTime, toDateTime })
    );
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBarHeader onMenuClick={() => setDrawerOpen(true)} />

      {/* Filter Drawer */}
      <FilterFormDrawer
        onSubmit={handleSubmit}
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

      {/* Toasts */}
      <Toast
        open={toast.open}
        onClose={handleCloseToast}
        message={toast.message}
        severity={toast.severity}
      />
      {finalReaponseBugCreated && (
        <BugSuccessMessage
          bugId={finalReaponseBugCreated.id}
          open={bugToastOpen}
          onClose={() => setBugToastOpen(false)}
        />
      )}
    </Box>
  );
};

export default App;
