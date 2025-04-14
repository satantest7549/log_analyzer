import {
  CREATE_BUG_FAILURE,
  CREATE_BUG_REQUEST,
  CREATE_BUG_SUCCESS,
} from "../actions";

const initialState = {
  loading: false,
  error: null,
  bugData: null,
};

const createBugReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUG_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_BUG_SUCCESS:
      return {
        ...state,
        loading: false,
        // bugData: [...state.bugData, action.payload],
        bugData: action.payload,
      };

    case CREATE_BUG_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default createBugReducer;
