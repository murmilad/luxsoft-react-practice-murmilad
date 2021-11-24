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

function* fetchResource(resource, callback, successAction) {
  try {
    const result = yield call(api, resource, callback)
    yield put({ type: successAction, payload: result })
  } catch (error) {
    yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
  }
}

export function* getDataTakeFork() {
  yield take("GET_BOOKS")
  yield fork(fetchResource, '/books', response => {return {books: response.data}}, "FETCH_BOOKS_FULFILLED")
  yield take("GET_SELECTIONS")
  yield fork(fetchResource, '/selections', response =>  response.data  , "FETCH_SELECTIONS_FULFILLED")
}


export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    getDataTakeFork(),
  ])
}

