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
import {
  fetchAnalyzeRequest,
  fetchCsttDataRequest,
  fetchCustomAnalyzeRequest,
} from "../redux";
import SelectInput from "./common/SelectInput";
import DateTimeInput from "./common/DateTimeInput";
import { APP_NM, MODULE_MAP, MODULE_NM, Select_Question } from "../constants";
import {
  getCurrentFormattedDateTime,
  getFormattedDateTimeNDaysAgo,
  getTodayMaxDateTime,
} from "../utils";

const todayMax = getTodayMaxDateTime();

const FilterFormDrawer = ({ drawerOpen, setDrawerOpen, setAnalysisType }) => {
  const [appName, setAppName] = useState(APP_NM[0]);
  const [moduleOptions, setModuleOptions] = useState(MODULE_MAP[APP_NM[0]]);
  const [errorModule, setErrorModule] = useState(MODULE_MAP[APP_NM[0]][0]);
  // const [errorModule, setErrorModule] = useState(MODULE_NM[0]);
  const [selectQuestion, setSelectQuestion] = useState(Select_Question[0]);
  const [fromDateTime, setFromDateTime] = useState(
    getFormattedDateTimeNDaysAgo(7)
  );
  const [toDateTime, setToDateTime] = useState(getCurrentFormattedDateTime());
  const [customQuestionText, setCustomQuestionText] = useState("");

  const dispatch = useDispatch();
  const finalCsttData = useSelector((state) => state.cstt);
  const analyzeLoading = useSelector((state) => state.analyze.loading);

  const handleAppNameChange = (e) => {
    const selectedApp = e.target.value;
    const relatedModules = MODULE_MAP[selectedApp] || [];
    setAppName(selectedApp);
    setModuleOptions(relatedModules);
    setErrorModule(relatedModules[0] || "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalysisType(null);
    dispatch(
      fetchCsttDataRequest({ appName, errorModule, fromDateTime, toDateTime })
    );
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

  const handleResetFilters = () => {
    setAppName(APP_NM[0]);
    setModuleOptions(MODULE_MAP[APP_NM[0]]);
    setErrorModule(MODULE_MAP[APP_NM[0]][0]);
    setFromDateTime(getFormattedDateTimeNDaysAgo(7));
    setToDateTime(getCurrentFormattedDateTime());
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
          // mb={1}
        >
          <Typography variant="h6">Filter Logs</Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <SelectInput
            label="Application Name"
            value={appName}
            onChange={handleAppNameChange}
            options={APP_NM}
            fullWidth
            variant="outlined"
            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            FormLabelProps={{ sx: { fontWeight: 500, color: "text.primary" } }}
          />

          <SelectInput
            label="Module Name"
            value={errorModule}
            onChange={(e) => setErrorModule(e.target.value)}
            options={moduleOptions}
            fullWidth
            variant="outlined"
            sx={{ mb: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            FormLabelProps={{ sx: { fontWeight: 500, color: "text.primary" } }}
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
          {/* {finalCsttData.finalData.length > 0 && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {`${finalCsttData.finalData.length} records fetched successfully!`}
            </Alert>
          )} */}
          {finalCsttData.csttDataLength !== null && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {`${finalCsttData.finalData.length} records fetched successfully!`}
            </Alert>
          )}

          <Box
            mt={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleResetFilters}
              // size="small"
              // type="submit"
              // fullWidth
              // disabled={finalCsttData.loading}
              // startIcon={
              //   finalCsttData.loading && (
              //     <CircularProgress size={20} color="inherit" />
              //   )
              // }
            >
              {finalCsttData.loading ? "Loading..." : "Clear filters"}
            </Button>
            <Button
              variant="contained"
              type="submit"
              // size="small"
              // fullWidth
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
