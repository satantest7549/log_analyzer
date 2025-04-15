import axios from "axios";
import { ENV_APP_CONFIG } from "../config";
import { ERROR_LOG_ANALYZER, tableHeader } from "../constants";

// Environment Config
const { AZURE_API_DOMAIN, AZURE_ORG, AZURE_PROJECT, PAT } = ENV_APP_CONFIG;

// API Endpoint
// const AZURE_API_URL = "http://127.0.0.1:8002/create/bug";
const AZURE_API_URL = `${AZURE_API_DOMAIN}/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/workitems/$Bug?api-version=7.0`;

export const bugCreateAPi = async (payload) => {
  const finalPayload = buildAzureBugPayload(payload);

  const headers = {
    "Content-Type": "application/json-patch+json",
    Authorization: "Basic " + btoa(":" + PAT),
  };

  const response = await axios.post(AZURE_API_URL, finalPayload, {
    headers,
  });

  return response.data;
};

// --------------------
// Payload Transformer
// --------------------
const buildAzureBugPayload = (payload) => {
  const bugFields = getBugFields(payload);
  return Object.entries(bugFields).map(([key, value]) => ({
    op: "add",
    path: key,
    value: value,
  }));
};

// --------------------
// Bug Field Mapper
// --------------------
const getBugFields = (payload) => {
  const titlePrefix = "Cstt Error Log Analyzer";
  const team = "Scrum Line";
  const Steps_to_Reproduce = `<b>${ERROR_LOG_ANALYZER}:</b><br/>${formatObjectAsHTML(
    payload
  )}<br/>`;

  const Enlyte_Work_Around = payload[tableHeader.HISTORICAL_SOLUTION]
    ? `<b>${tableHeader.HISTORICAL_SOLUTION}:</b><br/>${
        payload[tableHeader.HISTORICAL_SOLUTION]
      }`
    : "";

  const baseBugFields = {
    "/fields/System.Title": `${titlePrefix} ${payload[tableHeader.BUG_TITLE]}`,
    "/fields/System.Description": "ERR_DETAIL_SUMMARY",
    "/fields/Custom.Enlyte_APD_Team": team,
    "/fields/Microsoft.VSTS.Common.Severity": "4 - Low",
    "/fields/System.Tags": "Dummy cstt_error_log_Analyzer",
    "/fields/Custom.Enlyte_APD_Version_Planned": "2025.2",
    "/fields/Custom.Enlyte_How_Found": "System Monitor",
    "/fields/Custom.Enlyte_Where_Found": "4 - Dev",
    "/fields/Custom.Enlyte_APD_Found_By_Team": team,
    "/fields/Custom.Enlyte_APD_Found_In_Release_Version": "2025.2",
    "/fields/System.AreaPath": "APD\\WorkCenter",
    "/fields/Microsoft.VSTS.TCM.ReproSteps": Steps_to_Reproduce,
    "/fields/Custom.Enlyte_Work_Around": Enlyte_Work_Around,
    // "/fields/Custom.Enlyte_Discussion": payload[tableHeader.ANTHROPIC_AI_SUMMARY],
    // "/fields/Custom.Enlyte_RCA": "",
  };

  return baseBugFields;
};

// --------------------
// Format Object as HTML
// --------------------
const formatObjectAsHTML = (obj) => {
  if (!obj || typeof obj !== "object") return "";

  return Object.entries(obj)
    .map(([key, value]) => {
      // Remove the period from "ERROR NO."
      let formattedKey = key;
      if (formattedKey === "ERROR NO.") {
        formattedKey = "ERROR NO";
      }

      return `<b>${formattedKey}:</b> ${value}`;
    })
    .join("<br/>");
};
