import axios from "axios";
import { ENV_APP_CONFIG } from "../config";
import { formatDate } from "../utils";

const cstt_base_url = ENV_APP_CONFIG.CSTT_API_BASE_URL;

export const fetchCsttData = async (payload) => {
  const convertedPayload = payloadConversion(payload);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await axios.post(
    `${cstt_base_url}/api/CSTT`,
    convertedPayload,
    {
      headers,
    }
  );
  // const response = await axios.post("/cstt-dev/api/CSTT", convertedPayload, {
  //   headers,
  // });

  return response.data;
};

const payloadConversion = (data) => {
  return {
    correlation_id: null,
    work_item_id: null,
    selected_appname: null,
    selected_module: null,
    description: "ALL",
    description_error_number: null,
    error_number: null,
    severity: null,
    co_cd: null,
    org_cd: null,
    error_timestamp: null,
    error_log_id: null,
    servername: null,
    classname: null,
    methodname: null,
    error_detail: null,
    created_by: null,
    created_dt: "",
    fromDateTime: formatDate(data.fromDateTime),
    toDateTime: formatDate(data.toDateTime),
    query: null,
    error_app: data.appName,
    error_module: data.errorModule,
    error_description: "ALL",
    totalRecords: null,
  };
};
