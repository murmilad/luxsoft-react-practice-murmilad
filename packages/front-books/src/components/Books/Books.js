import React from 'react'
import { useQuery, useMutation, useReactiveVar } from '@apollo/client'
import { GET_ALL_BOOKS, DELETE_BOOK_MUTATION } from './graphql'
import { errorVar } from '../../cache';
var isNil = require('lodash.isnil');

function Books() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_BOOKS, {
    onError: (event) => {
      return errorVar(event.message)
    } 
  })
  const [deleteBook, { }] = useMutation(DELETE_BOOK_MUTATION, {
    refetchQueries: [
      {
      query: GET_ALL_BOOKS,
      },
    ],
    onError: (event) => {
      return errorVar(event.message)
    } 
  })

  if (loading) return <p>Loading...</p>
  
  
  const content = !isNil(data) ? data.allBooks : []
  return (
    <ul className="list-group books-list">
    {content.map((book,idx) =>
      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
        <span><strong>{book.title}</strong> by {book.author}</span>
        <span className="pull-right">
            <button type="button" data-testid="delete-button"  className="btn btn-outline-danger btn-sm"
                    onClick={()=>deleteBook({ variables: { bookId: book._id } })}>DELETE</button>
        </span>
      </li>
    )}
  </ul>
  )
 
}

export default Books
