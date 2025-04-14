import { call, put } from "redux-saga/effects";
import { fetchAnalyzeData, fetchAnalyzeWithCustomPayload } from "../../api";
import {
  fetchAnalyzeFailure,
  fetchAnalyzeSuccess,
  fetchCustomAnalyzeFailure,
  fetchCustomAnalyzeSuccess,
} from "../actions";

export function* fetchAnalyzeSaga(action) {
  try {
    const payload = action.payload;
    const response = yield call(fetchAnalyzeData, payload);
    yield put(fetchAnalyzeSuccess(response || []));
  } catch (error) {
    yield put(fetchAnalyzeFailure(error));
  }
}

export function* fetchCustomAnalyzeSaga(action) {
  try {
    const payload = action.payload;
    const response = yield call(fetchAnalyzeWithCustomPayload, payload);
    yield put(fetchCustomAnalyzeSuccess(response));
  } catch (error) {
    yield put(fetchCustomAnalyzeFailure(error));
  }
}
