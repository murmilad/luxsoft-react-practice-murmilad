import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import "bootstrap/dist/css/bootstrap.min.css"
import {injectStoreToServer} from "./actions/server";

import {rootEpic} from './epics'


const epicMiddleware = createEpicMiddleware()
const store = createStore(reducer,
  
      applyMiddleware(epicMiddleware)
    );
    
epicMiddleware.run(rootEpic)

    
    
injectStoreToServer(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);