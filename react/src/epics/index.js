
import { api } from '../utils/utils'
import { of } from 'rxjs'
import { mergeMap, map, mapTo, catchError, first} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax';

import SERVER from "../actions/server";


const fetchBooksEpic = action$ => action$.pipe(
  ofType('GET_BOOKS'),
  mergeMap(action => ajax.getJSON(SERVER.defaults.baseURL + '/books').pipe(
    map(books => ({type: 'FETCH_BOOKS_FULFILLED', payload: {books} })),
    catchError(error => of({
      type: 'SHOW_ERROR_MODAL',
      payload: {message: error.message},
    }))
  )))

const fetchSelectionsEpic = action$ => action$.pipe(
  ofType('GET_SELECTIONS'),
  mergeMap(action => ajax.getJSON(SERVER.defaults.baseURL + '/selections').pipe(
    map(selections => ({type: 'FETCH_SELECTIONS_FULFILLED', payload: selections })),
    catchError(error => of({
      type: 'SHOW_ERROR_MODAL',
      payload: {message: error.message},
    }))
  )))


export const rootEpic = combineEpics(
  fetchBooksEpic,
  fetchSelectionsEpic,
//  fetchErrorEpic
);


