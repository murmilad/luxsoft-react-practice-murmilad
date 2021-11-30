import {render as rtlRender} from '@testing-library/react'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {reducer} from '../reducers/reducer'

export function render(ui,{
  initialState,
  store = createStore(reducer, {books: [{"title":"Java test","author":"Javist","_id":"testBook"}]}),
  ...renderOptions
} = {}
 ) {

 function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>
 }
 return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
 }