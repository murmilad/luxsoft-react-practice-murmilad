import { Button } from 'react-bootstrap'
import { GET_BOOK_BY_ID, DELETE_BOOK_FROM_SELECTION_MUTATION, GET_ALL_SELECTIONS } from "./graphql";
import { errorVar } from '../../cache';
import { useQuery, useMutation } from '@apollo/client'

var isNil = require('lodash.isnil');


function BookInSelection(props) {
  const { bookId, selectionId } = props

  const [deleteBookFromSelection, {  }] = useMutation(DELETE_BOOK_FROM_SELECTION_MUTATION, {
    refetchQueries: [
      {
      query: GET_ALL_SELECTIONS,
      },
    ],
    onError: (event) => errorVar(event.message) 
  })

  const { data, error } = useQuery(GET_BOOK_BY_ID, {
    variables: { id: bookId },
    onError: (event) => {
      return errorVar(event.message)
    } 
  })

  if (isNil(data?.getBook)) return <p>Loading...</p>

  if (!data?.getBook) return <p>No such Book!</p>

  const book = data.getBook
  return (
    <div className="selection_list_item">
      <span><strong>{book?.title}</strong> by {book?.author}</span>
      <Button
        onClick={() => deleteBookFromSelection({ variables: { bookId: bookId, selectionId: selectionId } })}
        variant="outline-danger">Delete</Button>
    </div>
  )
}

export default BookInSelection