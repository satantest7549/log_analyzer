import {
  FETCH_CSTT_DATA_FAILURE,
  FETCH_CSTT_DATA_REQUEST,
  FETCH_CSTT_DATA_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  error: null,
  finalData: [],
};

const csttReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CSTT_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CSTT_DATA_SUCCESS:
      return { ...state, loading: false, finalData: action.payload };

    case FETCH_CSTT_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default csttReducer;
