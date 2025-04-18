import React from "react";
import { Snackbar, Alert, Link, Stack } from "@mui/material";
import { ENV_APP_CONFIG } from "../../config";

const BugSuccessMessage = ({
  bugId,
  open,
  onClose,
  autoHideDuration = 3000,
}) => {
  const AZURE_DOMAIN = ENV_APP_CONFIG.AZURE_API_DOMAIN;
  const ORG = ENV_APP_CONFIG.AZURE_ORG;
  const PROJECT = ENV_APP_CONFIG.AZURE_PROJECT;

  // const devOpsUrl = "http://127.0.0.1:8002/create/bug";
  const devOpsUrl = `${AZURE_DOMAIN}/${ORG}/${PROJECT}/_workitems/edit/${bugId}`;

  return (
    <Snackbar
      key={bugId}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        <Stack>
          <span>✅ Bug created successfully! Work Item ID: {bugId}</span>
          <Link
            href={devOpsUrl}
            target="_blank"
            rel="noopener"
            underline="hover"
            color="inherit"
          >
            🔗 View in Azure DevOps
          </Link>
        </Stack>
      </Alert>
    </Snackbar>
  );
};

export default BugSuccessMessage;
