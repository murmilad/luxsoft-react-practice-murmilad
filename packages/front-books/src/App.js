import React, { lazy, Suspense } from 'react';

//components
import ErrorModal from "./components/Errors/ErrorModal"

//styles
import './App.css';
import CreateBookForm from "./components/Books/CreateBookForm";
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


const Books = lazy(() => import( "./components/Books/Books"));

function App() {

  return (
    <>
    <ApolloProvider client={client}>
    <div className="wrapper books_wrapper">
      <h2 className="page_title">Books</h2>
      <CreateBookForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Books/>
      </Suspense>
    </div>
    <ErrorModal />
    </ApolloProvider>
    </>
  );
}

export default App;