import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"


import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  ApolloProvider,
  } from '@apollo/client'
  const cache = new InMemoryCache()
  const link = new HttpLink({
    uri: 'http://localhost:7000/',
  })
  const client = new ApolloClient({
  cache,
  link,
})
    
    

ReactDOM.render(
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>,
    document.getElementById('root')
);