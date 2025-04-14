import { call, put } from "redux-saga/effects";
import { bugCreateAPi } from "../../api";
import { createBugFailure, createBugSuccess } from "../actions";

export function* createBugSaga(action) {
  try {
    const payload = action.payload;
    const response = yield call(bugCreateAPi, payload);
    yield put(createBugSuccess(response));
  } catch (error) {
    yield put(createBugFailure(error));
  }
}
