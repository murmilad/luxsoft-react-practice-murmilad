import { Accordion } from 'react-bootstrap';

//components
import Selection from './components/Selections/Selection';
import AddBookToSelectionForm from './components/Selections/AddBookToSelectionForm';
import CreateSelectionForm from './components/Selections/CreateSelectionForm'
import ErrorModal from "./components/Errors/ErrorModal"
import { GET_ALL_SELECTIONS } from "./components/Selections/graphql";
import { useQuery, useMutation } from '@apollo/client'
import { errorVar } from './cache';

//styles
import './App.css';


var isNil = require('lodash.isnil');

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_SELECTIONS, {
    onError: (event) => {
      return errorVar(event.message)
    } 
  })
  if (loading) return <p>Loading...</p>
  const selections = !isNil(data) ? data.allSelections : []

  return (
    <>
    <div className="wrapper selections_wrapper">
      <h2 className="page_title">Selections</h2>
      <CreateSelectionForm />
      <AddBookToSelectionForm selections={selections}/>
      { selections?.length > 0 && (
        <Accordion>
          {selections.map((el,i) => {
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
