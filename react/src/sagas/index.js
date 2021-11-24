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



export function* fetchBooks() {
  try {
    const books = yield call(api, '/books')
    yield put({type: "FETCH_BOOKS_FULFILLED", payload: {books}})
  } catch (error) {
    yield put({type: "SHOW_ERROR_MODAL", payload: {error}})
  }
}

export function* getBooksTakeEvery() {
  yield takeEvery({type: "GET_BOOKS"}, fetchBooks)
}


export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    getBooksTakeEvery(),
  ])
}

