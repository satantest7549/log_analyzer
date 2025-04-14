import axios from "axios";
import { reverseTransformCsttItem } from "../utils";
import { ENV_APP_CONFIG } from "../config";

const AZURE_DOMAIN = ENV_APP_CONFIG.AZURE_API_DOMAIN;
const ORG = ENV_APP_CONFIG.AZURE_ORG;
const PROJECT = ENV_APP_CONFIG.AZURE_PROJECT;
const pat = ENV_APP_CONFIG.PAT;

//Create bug API using filtered from cstt api response data as payload
export const bugCreateAPi = async (payload) => {
  const convertedPayload = reverseTransformCsttItem(payload);

  const finalPayload = payloadConvert(convertedPayload);

  const headers = {
    "Content-Type": "application/json-patch+json",
    Authorization: "Basic " + btoa(":" + pat),
  };

  console.log({ finalPayload }, "final paylod for create bug");

  // const url = `http://127.0.0.1:8002/create/bug`;

  const url = `${AZURE_DOMAIN}/${ORG}/${PROJECT}/_apis/wit/workitems/$Bug?api-version=7.0`;
  const response = await axios.post(url, finalPayload, { headers });

  return response.data;
};

const payloadConvert = (payload) => {
  const Title_Prefix = "Cstt Error Log Analyzer";

  const requiredPayload = {
    bug_title: `${Title_Prefix} ${payload.bug_title}`,
    description: "ERR_DETAIL_SUMMARY",
    severity: "1 - Critical",
    tags: "Dummy cstt_error_log_Analyzer",
    version_planned: "2025.2",
    how_found: "System Monitor",
    where_found: "4 - Dev",
    found_by_team: "WC Pre Estimating Workflow",
    found_in_release: "2025.2",
    area: "APD\\WorkCenter",
    discussion: payload.anthropic_ai_summary,
    stepsToReproduce: JSON.stringify(payload),
    workAround: `Historical_solution: ${payload.historical_solution} \n Anthropic_ai_summary:${payload.anthropic_ai_summary}`,
    rca: "",
  };
  // version_planned = "2025.2"
  // how_found = "System Monitor"
  // where_found = "4 - Dev"
  // found_by_team = "WC Pre Estimating Workflow"
  // found_in_release = "2025.2"
  // severity = "1 - Critical"

  const newPayload = [
    {
      op: "add",
      path: "/fields/System.Title",
      value: requiredPayload.bug_title,
    },
    {
      op: "add",
      path: "/fields/System.Description",
      value: requiredPayload.description,
    },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.Common.Severity",
      value: requiredPayload.severity,
    },
    { op: "add", path: "/fields/System.Tags", value: requiredPayload.tags },

    {
      op: "add",
      path: "/fields/Custom.Enlyte_APD_Version_Planned",
      value: requiredPayload.version_planned,
    },
    {
      op: "add",
      path: "/fields/Custom.Enlyte_How_Found",
      value: requiredPayload.how_found,
    },
    {
      op: "add",
      path: "/fields/Custom.Enlyte_Where_Found",
      value: requiredPayload.where_found,
    },
    {
      op: "add",
      path: "/fields/Custom.Enlyte_APD_Found_By_Team",
      value: requiredPayload.found_by_team,
    },
    {
      op: "add",
      path: "/fields/Custom.Enlyte_APD_Found_In_Release_Version",
      value: requiredPayload.found_in_release,
    },
    {
      op: "add",
      path: "/fields/System.AreaPath",
      value: requiredPayload.area,
    },
    // {
    //   op: "add",
    //   path: "/fields/Custom.Enlyte_Discussion",
    //   value: requiredPayload.discussion,
    // },
    // {
    //   op: "add",
    //   path: "/fields/Custom.Enlyte_StepsToReproduce",
    //   value: requiredPayload.stepsToReproduce,
    // },
    {
      op: "add",
      path: "/fields/Microsoft.VSTS.TCM.ReproSteps",
      value: requiredPayload.stepsToReproduce,
    },
    {
      op: "add",
      path: "/fields/Custom.Enlyte_Work_Around",
      value: requiredPayload.workAround,
    },
    // {
    //   op: "add",
    //   path: "/fields/Custom.Enlyte_RCA",
    //   value: requiredPayload.rca,
    // },
  ];

  return newPayload;
};
