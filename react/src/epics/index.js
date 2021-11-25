
import { api } from '../utils/utils'
import { of, from } from 'rxjs'
import { switchMap, map,  catchError} from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax';



const fetchBooksEpic = action$ => action$.pipe(
  ofType('GET_BOOKS','/books'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(api('/books', response => {return {books: response.data}})).pipe(
    map(payload => ({type: 'FETCH_BOOKS_FULFILLED', payload})),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: {message: error.message},
    }))
  )))



export const rootEpic = combineEpics(
  fetchBooksEpic,
);


