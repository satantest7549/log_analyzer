import React, { useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Box,
  Typography,
  Alert,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyzeRequest, fetchCustomAnalyzeRequest } from "../redux";
import SelectInput from "./common/SelectInput";
import DateTimeInput from "./common/DateTimeInput";
import { APP_NM, MODULE_NM, Select_Question } from "../constants";
import {
  getCurrentFormattedDateTime,
  getFormattedDateTimeNDaysAgo,
  getTodayMaxDateTime,
} from "../utils";

const todayMax = getTodayMaxDateTime();

const FilterFormDrawer = ({
  onSubmit,
  drawerOpen,
  setDrawerOpen,
  setAnalysisType,
}) => {
  const [errorModule, setErrorModule] = useState(MODULE_NM[0]);
  const [appName, setAppName] = useState(APP_NM[0]);
  const [selectQuestion, setSelectQuestion] = useState(Select_Question[0]);
  const [fromDateTime, setFromDateTime] = useState(
    getFormattedDateTimeNDaysAgo(7)
  );
  const [toDateTime, setToDateTime] = useState(getCurrentFormattedDateTime());
  const [customQuestionText, setCustomQuestionText] = useState("");

  const dispatch = useDispatch();
  const finalCsttData = useSelector((state) => state.cstt);
  const analyzeLoading = useSelector((state) => state.analyze.loading);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ appName, errorModule, fromDateTime, toDateTime });
    // setDrawerOpen(false);
  };

  const handleAnalyze = (payload) => {
    if (selectQuestion === Select_Question[1] && customQuestionText !== "") {
      const customPayload = {
        payload,
        main_question: customQuestionText,
      };
      dispatch(fetchCustomAnalyzeRequest(customPayload));
      setAnalysisType("custom");
    } else {
      dispatch(fetchAnalyzeRequest(payload));
      setAnalysisType("default");
    }
    // setDrawerOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <Box sx={{ width: 300, padding: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Filter Logs</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <SelectInput
            label="APP_NAME"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            options={APP_NM}
          />
          <SelectInput
            label="MODULE_NAME"
            value={errorModule}
            onChange={(e) => setErrorModule(e.target.value)}
            options={MODULE_NM}
          />
          <DateTimeInput
            label="From Date-Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={fromDateTime}
            onChange={(e) => setFromDateTime(e.target.value)}
            max={todayMax}
          />
          <DateTimeInput
            label="To Date-Time"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={toDateTime}
            onChange={(e) => setToDateTime(e.target.value)}
            max={todayMax}
          />
          {finalCsttData.finalData.length > 0 && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {`${finalCsttData.finalData.length} records fetched successfully!`}
            </Alert>
          )}

          <Box mt={2}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={finalCsttData.loading}
              startIcon={
                finalCsttData.loading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              {finalCsttData.loading ? "Loading..." : "Apply Filters"}
            </Button>
          </Box>
        </form>
        <Box>
          <SelectInput
            label="Select Question"
            value={selectQuestion}
            onChange={(e) => {
              setSelectQuestion(e.target.value);
              // Clear the input when switching off custom
              if (e.target.value !== "Custom") {
                setCustomQuestionText("");
              }
            }}
            options={Select_Question}
          />
          {selectQuestion === "Custom" && (
            <TextField
              fullWidth
              label="Enter your custom question"
              value={customQuestionText}
              onChange={(e) => setCustomQuestionText(e.target.value)}
              margin="normal"
            />
          )}
          <Button
            fullWidth
            variant="contained"
            disabled={
              analyzeLoading ||
              finalCsttData.finalData.length === 0 ||
              (selectQuestion === "Custom" && customQuestionText.trim() === "")
            }
            onClick={() => handleAnalyze(finalCsttData.finalData)}
            startIcon={
              analyzeLoading && <CircularProgress size={20} color="inherit" />
            }
            sx={{ mt: 2 }}
          >
            {analyzeLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterFormDrawer;
