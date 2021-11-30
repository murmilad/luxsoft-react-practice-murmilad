
import { api } from '../utils/utils'
import { of, from } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { ajax } from 'rxjs/ajax';

import SERVER from "../actions/server";


const fetchSelectionsEpic = action$ => action$.pipe(
  ofType('GET_SELECTIONS', '/selections'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(SERVER.get('/selections')).pipe(
    map(response => ({ type: 'FETCH_SELECTIONS_FULFILLED', payload: response.data })),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: { message: error.message },
    }))
  )))

const createSelectionEpic = action$ => action$.pipe(
  ofType('CREATE_SELECTION', '/selections'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(SERVER.post('/selections', action.selection)).pipe(
    map(response => ({ type: 'GET_SELECTIONS' })),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: { message: error.message },
    }))
  )))
const addBookToSelectionEpic = action$ => action$.pipe(
  ofType('ADD_BOOK_TO_SELECTION', '/selections'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(SERVER.post('/selections/' + action.bookSelection.selectionId + "/books", [action.bookSelection.bookId])).pipe(
    map(response => ({ type: 'GET_SELECTIONS' })),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: { message: error.message },
    }))
  )))
  const removeBookFromSelectionEpic = action$ => action$.pipe(
    ofType('DELETE_BOOK_FROM_SELECTION', '/selections'),
    //from(api..,'/books').pipe вызов сервера
    //switchMap отменяются запросы
    switchMap(action => from(SERVER.delete('/selections/' + action.bookSelection.selectionId + "/books/" + action.bookSelection.bookId)).pipe(
      map(response => ({ type: 'GET_SELECTIONS' })),
      catchError(error => of({ //of создает Observable
        type: 'SHOW_ERROR_MODAL',
        payload: { message: error.message },
      }))
    )))
  const removeSelectionEpic = action$ => action$.pipe(
  ofType('DELETE_SELECTION', '/selections'),
  //from(api..,'/books').pipe вызов сервера
  //switchMap отменяются запросы
  switchMap(action => from(SERVER.delete('/selections/' + action.selectionId)).pipe(
    map(response => ({ type: 'GET_SELECTIONS' })),
    catchError(error => of({ //of создает Observable
      type: 'SHOW_ERROR_MODAL',
      payload: { message: error.message },
    }))
  )))
export const rootEpic = combineEpics(
  fetchSelectionsEpic,
  createSelectionEpic,
  addBookToSelectionEpic,
  removeBookFromSelectionEpic,
  removeSelectionEpic,
);


