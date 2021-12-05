import {useState} from "react";
import { ADD_BOOKS_TO_SELECTION_MUTATION, GET_ALL_SELECTIONS, GET_ALL_BOOKS } from "./graphql";
import { errorVar } from '../../cache';
import { useQuery, useMutation } from '@apollo/client'
var isNil = require('lodash.isnil');

function AddBookToSelectionForm(props) {
  const [bookId, setBookId] = useState("")
  const [selectionId, setSelectionId] = useState("")
  const { data, loading, error, refetch } = useQuery(GET_ALL_BOOKS, {
    onError: (event) => {
      return errorVar(event.message)
    } 
  })
  const [addBooksToSelection, {  }] = useMutation(ADD_BOOKS_TO_SELECTION_MUTATION, {
    refetchQueries: [
      {
      query: GET_ALL_SELECTIONS,
      },
    ],
    onError: (event) => errorVar(event.message) 
  })


  const onSubmit = () => {
    if (bookId && selectionId) {
      addBooksToSelection({ variables: {selectionId: selectionId, books: [{_id: bookId}] }})
    } else {
      errorVar("Please select book and selection")
    }
  }

  if (loading) return <p>Loading...</p>
  const books = !isNil(data) ? data.allBooks : []
  return (
    <form  onSubmit={e=>{e.preventDefault(); onSubmit()}} className="selection_control_wrap">
      <div className="row">
        <div className="selection_control_item col-md-4">
          <label htmlFor="bookSelect">Add book</label>
          <select className="form-select" id="bookSelect"
                  onChange={e=>setBookId(e.target.value)}>
            <option value="">Choose a book</option>
              { books && books.map((el, i) =>
                  <option key={i} value={el._id}>{el.title} by {el.author}</option>)}
          </select>
        </div>

        <div className="selection_control_item col-md-5">
          <label htmlFor="selectionSelect">to selection</label>
          <select className="form-select" id="selectionSelect"
                  onChange={e=>setSelectionId(e.target.value)}>
            <option value="">Choose a selection</option>
            { props.selections && props.selections.map((el, i) =>
                <option key={i} value={el._id}>{el.title} by {el.author}</option>)}
          </select>
        </div>

        <div className="col-md-1 d-flex align-items-end">
          <button type="submit" className="btn btn-primary add-book-to-selection-button">Add</button>
        </div>
      </div>
    </form>
  )
}

export default AddBookToSelectionForm