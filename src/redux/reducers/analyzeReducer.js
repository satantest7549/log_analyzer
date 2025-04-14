import {
  FETCH_ANALYZE_DATA_FAILURE,
  FETCH_ANALYZE_DATA_REQUEST,
  FETCH_ANALYZE_DATA_SUCCESS,
  FETCH_CUSTOM_ANALYZE_DATA_FAILURE,
  FETCH_CUSTOM_ANALYZE_DATA_REQUEST,
  FETCH_CUSTOM_ANALYZE_DATA_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  error: null,
  analyzeData: [],
  customAnalyze: null,
};

const analyzeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ANALYZE_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ANALYZE_DATA_SUCCESS:
      return { ...state, loading: false, analyzeData: action.payload };

    case FETCH_ANALYZE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_CUSTOM_ANALYZE_DATA_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CUSTOM_ANALYZE_DATA_SUCCESS:
      return { ...state, loading: false, customAnalyze: action.payload };

    case FETCH_CUSTOM_ANALYZE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default analyzeReducer;
