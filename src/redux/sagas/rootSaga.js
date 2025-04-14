import { takeLatest } from "redux-saga/effects";
import {
  CREATE_BUG_REQUEST,
  FETCH_ANALYZE_DATA_REQUEST,
  FETCH_CSTT_DATA_REQUEST,
  FETCH_CUSTOM_ANALYZE_DATA_REQUEST,
} from "../actions";
import { fetchCsttSaga } from "./csttSaga";
import { fetchAnalyzeSaga, fetchCustomAnalyzeSaga } from "./analyzeSaga";
import { createBugSaga } from "./createBugSaga";

export default function* rootSaga() {
  yield takeLatest(FETCH_CSTT_DATA_REQUEST, fetchCsttSaga);
  yield takeLatest(FETCH_ANALYZE_DATA_REQUEST, fetchAnalyzeSaga);
  yield takeLatest(FETCH_CUSTOM_ANALYZE_DATA_REQUEST, fetchCustomAnalyzeSaga);
  yield takeLatest(CREATE_BUG_REQUEST, createBugSaga);
}
