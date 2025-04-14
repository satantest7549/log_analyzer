export const FETCH_CSTT_DATA_REQUEST = "FETCH_CSTT_DATA_REQUEST";
export const FETCH_CSTT_DATA_SUCCESS = "FETCH_CSTT_DATA_SUCCESS";
export const FETCH_CSTT_DATA_FAILURE = "FETCH_CSTT_DATA_FAILURE";

export const fetchCsttDataRequest = (requestPayload) => ({
  type: FETCH_CSTT_DATA_REQUEST,
  payload: requestPayload,
});

export const fetchCsttDataSuccess = (data) => ({
  type: FETCH_CSTT_DATA_SUCCESS,
  payload: data,
});

export const fetchCsttDataFailure = (error) => ({
  type: FETCH_CSTT_DATA_FAILURE,
  payload: error,
});
