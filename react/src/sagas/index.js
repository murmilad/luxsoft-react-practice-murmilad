import { all } from 'redux-saga/effects'

import { api } from '../utils/utils'
import {
  call,
  put,
  takeEvery,
  takeLatest,
  throttle,
  take,
  fork,
  cancel,
} from 'redux-saga/effects'

function* fetchResource(resource, successAction) {
  try {
    const result = yield call(api, resource)
    yield put({ type: successAction, data: result })
  } catch (error) {
    yield put({type: "SHOW_ERROR_MODAL", payload: {error}})
  }
}

export function* getDataTakeFork() {
  yield take({type: "GET_BOOKS"})
  yield fork(fetchResource, '/books', "FETCH_BOOKS_FULFILLED")
  yield take({type: "GET_SELECTIONS"})
  yield fork(fetchResource, '/selections', "FETCH_SELECTIONS_FULFILLED")
}


export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    getDataTakeFork(),
  ])
}

