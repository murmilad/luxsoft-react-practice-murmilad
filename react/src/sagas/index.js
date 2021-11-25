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
    yield take("GET_SELECTIONS")
    yield fork(fetchResource, '/selections', response =>  response  , "FETCH_SELECTIONS_FULFILLED")
}
  
function* fetchResource(resource, callback, successAction) {
  try {
    const result = yield call(SERVER.get, resource)
    yield put({ type: successAction, payload: result.data})
  } catch (error) {
    yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
  }
}

export function* callServerLastest() {
    yield takeLatest("DELETE_BOOK", deleteResource, action => '/books/' + action.book._id, 'GET_BOOKS')
    yield takeLatest("CREATE_BOOK", postResource, 'books', 'GET_BOOKS')
}
function* deleteResource(link, successAction, action) {
    try {
      const result = yield call(SERVER.delete, link(action))
      yield put({ type: successAction})
    } catch (error) {
//      yield put({type: "SHOW_ERROR_MODAL", payload: {message: error.message}})
    }
  }
  
  function* postResource(link, successAction, action) {
    try {
      const result = yield call(SERVER.post, link, action.book)
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

