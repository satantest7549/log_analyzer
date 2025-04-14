import { combineReducers } from "redux";
import csttReducer from "./csttReducer";
import analyzeReducer from "./analyzeReducer";
import createBugReducer from "./createBugReducer";

const rootReducer = combineReducers({
  cstt: csttReducer,
  analyze: analyzeReducer,
  bug: createBugReducer,
});

export default rootReducer;
