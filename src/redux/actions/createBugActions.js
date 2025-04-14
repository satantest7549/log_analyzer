export const CREATE_BUG_REQUEST = "CREATE_BUG_REQUEST";
export const CREATE_BUG_SUCCESS = "CREATE_BUG_SUCCESS";
export const CREATE_BUG_FAILURE = "CREATE_BUG_FAILURE";

export const createBugRequest = (requestPayload) => ({
  type: CREATE_BUG_REQUEST,
  payload: requestPayload,
});

export const createBugSuccess = (data) => ({
  type: CREATE_BUG_SUCCESS,
  payload: data,
});

export const createBugFailure = (error) => ({
  type: CREATE_BUG_FAILURE,
  payload: error,
});
