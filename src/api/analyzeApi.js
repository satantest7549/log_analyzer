import axios from "axios";
import { transformCsttResponse } from "../utils";
import { ENV_APP_CONFIG } from "../config";

const baseUrl = ENV_APP_CONFIG.ANALYZE_API_BASE_URL;

//API using filtered from cstt api response data as payload
export const fetchAnalyzeData = async (payload) => {
  const response = await axios.post(`${baseUrl}/analyze`, payload);

  const finalResult = transformCsttResponse(response.data.results);

  return finalResult;
};

//Call API using filtered from cstt api response data and custom Setting as payload
export const fetchAnalyzeWithCustomPayload = async (payload) => {
  const response = await axios.post(
    `${baseUrl}/analyze-custom-question/`,
    payload
  );

  return response.data.response;
};
