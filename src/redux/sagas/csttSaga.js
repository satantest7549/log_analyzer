import { call, put } from "redux-saga/effects";
import { fetchCsttData } from "../../api";
import {
  fetchCsttDataFailure,
  fetchCsttDataSuccess,
  resetAnalyzeState,
} from "../actions";

export function* fetchCsttSaga(action) {
  try {
    const payload = action.payload;
    const response = yield call(fetchCsttData, payload);
    yield put(fetchCsttDataSuccess(response || []));
    yield put(resetAnalyzeState());
  } catch (error) {
    yield put(fetchCsttDataFailure(error));
  }
}
