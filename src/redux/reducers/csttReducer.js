import {
  FETCH_CSTT_DATA_FAILURE,
  FETCH_CSTT_DATA_REQUEST,
  FETCH_CSTT_DATA_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  error: null,
  finalData: [],
  csttDataLength: null,
};

const csttReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CSTT_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CSTT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        finalData: action.payload,
        csttDataLength: action.payload.length,
      };

    case FETCH_CSTT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        dataLength: null,
      };

    default:
      return state;
  }
};

export default csttReducer;
