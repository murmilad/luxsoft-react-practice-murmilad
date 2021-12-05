import { gql } from '@apollo/client'

export const GET_ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      _id
      title
      author
    }
  }
`
export const GET_BOOK_BY_ID = gql`
  query getBook($id: ID!) {
    getBook(id: $id) {
      _id
      title
      author
    }
  }
`
export const ADD_BOOK_MUTATION = gql`
  mutation addBook($book: NewBookInput!) {
    addBook(book: $book) {
      _id
      title
      author
    }
  }
`
export const EDIT_BOOK_MUTATION = gql`
  mutation editBook($bookId: ID!, $book: EditBookInput!) {
    editBook(bookId: $bookId, book: $book) {
      _id
      title
      author
    }
  }
`

export const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId)
  }
`
