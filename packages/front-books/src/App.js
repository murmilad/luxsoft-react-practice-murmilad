import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import ErrorModal from "./components/Errors/ErrorModal"

//styles
import './App.css';
import CreateBookForm from "./components/Books/CreateBookForm";
const Books = lazy(() => import( "./components/Books/Books"));

function App() {
  const selections = useSelector(state => state.selections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "GET_BOOKS"})
    dispatch({type: "GET_SELECTIONS"})
  }, [])

  return (
    <>
    <div className="wrapper books_wrapper">
      <h2 className="page_title">Books</h2>
      <CreateBookForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Books/>
      </Suspense>
    </div>
    <ErrorModal />
    </>
  );
}

export default App;