import React, { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

//components
import Selection from './components/Selections/Selection';
import AddBookToSelectionForm from './components/Selections/AddBookToSelectionForm';
import CreateSelectionForm from './components/Selections/CreateSelectionForm'
import ErrorModal from "./components/Errors/ErrorModal"

//styles
import './App.css';

function App() {
  const selections = useSelector(state => state.selections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "GET_SELECTIONS"})
  }, [])

  return (
    <>
    <div className="wrapper selections_wrapper">
      <h2 className="page_title">Selections</h2>
      <CreateSelectionForm />
      <AddBookToSelectionForm />
      { selections?.data.length > 0 && (
        <Accordion>
          {selections.data.map((el,i) => {
            return <Selection key={i} item={el} itemKey={i} />
          })}
        </Accordion>
      )}
    </div>
    <ErrorModal />
    </>
  );
}

export default App;
