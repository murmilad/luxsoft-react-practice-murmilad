import { all } from 'redux-saga/effects'

import SERVER from "../actions/server";

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

export function* getDataTakeFork() {
    yield take("GET_BOOKS")
    yield fork(fetchResource, '/books', response =>  ({ books: response.data })  , "FETCH_BOOKS_FULFILLED")
}
  
function* fetchResource(resource, resultCallback, successAction) {
  try {
    const result = yield call(SERVER.get, resource)
    yield put({ type: successAction, payload: resultCallback(result)})
  } catch (error) {
    yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
  }
}

export function* callServerLastest() {
    yield takeLatest("DELETE_BOOK", deleteResource, action => '/books/' + action.book._id, 'GET_BOOKS')
    yield takeLatest("CREATE_BOOK", postResource, 'books', request => request.book, 'GET_BOOKS')
}
function* deleteResource(linkCallback, successAction, action) {
    try {
      const result = yield call(SERVER.delete, linkCallback(action))
      yield put({ type: successAction})
    } catch (error) {
//      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }
  
  function* postResource(link, requestCallback, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, requestCallback(action))
      yield put({ type: successAction})
    } catch (error) {
//      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }

  
export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    getDataTakeFork(),
    callServerLastest(),
  ])
}

