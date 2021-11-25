
import { api } from '../utils/utils'
import { of, from } from 'rxjs'
import { switchMap, map,  catchError} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax';

import SERVER from "../actions/server";


const fetchBooksEpic = action$ => action$.pipe(
  ofType('GET_BOOKS','/books'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(SERVER.get('/books')).pipe(
    map(response => ({type: 'FETCH_BOOKS_FULFILLED', payload: {books: response.data}})),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: {message: error.message},
    }))
  )))



export const rootEpic = combineEpics(
  fetchBooksEpic,
);


