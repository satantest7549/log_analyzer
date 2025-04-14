export const FETCH_ANALYZE_DATA_REQUEST = "FETCH_ANALYZE_DATA_REQUEST";
export const FETCH_ANALYZE_DATA_SUCCESS = "FETCH_ANALYZE_DATA_SUCCESS";
export const FETCH_ANALYZE_DATA_FAILURE = "FETCH_ANALYZE_DATA_FAILURE";

export const FETCH_CUSTOM_ANALYZE_DATA_REQUEST = "FETCH_CUSTOM_ANALYZE_DATA_REQUEST";
export const FETCH_CUSTOM_ANALYZE_DATA_SUCCESS = "FETCH_CUSTOM_ANALYZE_DATA_SUCCESS";
export const FETCH_CUSTOM_ANALYZE_DATA_FAILURE = "FETCH_CUSTOM_ANALYZE_DATA_FAILURE";

export const fetchAnalyzeRequest = (requestPayload) => ({
  type: FETCH_ANALYZE_DATA_REQUEST,
  payload: requestPayload,
});

export const fetchAnalyzeSuccess = (data) => ({
  type: FETCH_ANALYZE_DATA_SUCCESS,
  payload: data,
});

export const fetchAnalyzeFailure = (error) => ({
  type: FETCH_ANALYZE_DATA_FAILURE,
  payload: error,
});

export const fetchCustomAnalyzeRequest = (requestPayload) => ({
  type: FETCH_CUSTOM_ANALYZE_DATA_REQUEST,
  payload: requestPayload,
});

export const fetchCustomAnalyzeSuccess = (data) => ({
  type: FETCH_CUSTOM_ANALYZE_DATA_SUCCESS,
  payload: data,
});

export const fetchCustomAnalyzeFailure = (error) => ({
  type: FETCH_CUSTOM_ANALYZE_DATA_FAILURE,
  payload: error,
});
