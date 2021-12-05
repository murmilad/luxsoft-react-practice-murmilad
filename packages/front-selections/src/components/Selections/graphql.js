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
export const GET_ALL_SELECTIONS = gql`
  query allSelections {
    allSelections {
      _id
      title
      author
      email
    }
  }
`
export const GET_SELECTION_BY_ID = gql`
  query getSelection($id: ID!) {
    getSelection(id: $id) {
      _id
      title
      author
      email
    }
  }
`
export const ADD_SELECTION_MUTATION = gql`
  mutation addSelection($selection: NewSelectionInput!) {
    addSelection(selection: $selection) {
      _id
      title
      author
      email
    }
  }
`

export const ADD_BOOKS_TO_SELECTION_MUTATION = gql`
  mutation addBooksToSelection($selectionId: ID!, $books: [BookInput!]!) {
    addBooksToSelection(selectionId: $selectionId, books: $books) {
      _id
      title
      author
      email
    }
  }
`

export const DELETE_BOOK_FROM_SELECTION_MUTATION = gql`
  mutation deleteBookFromSelection($selectionId: ID!, $bookId: ID!) {
    deleteBookFromSelection(selectionId: $selectionId, bookId: $bookId) {
      _id
      title
      author
      email
    }
  }
`

export const EDIT_SELECTION_MUTATION = gql`
  mutation editBook($selectionId: ID!, $selection: EditSelectionInput!) {
    editSelection(selectionId: $selectionId, selection: $selection) {
      _id
      title
      author
      email
    }
  }
`

export const DELETE_SELECTION_MUTATION = gql`
  mutation deleteSelection($selectionId: ID!) {
    deleteSelection(selectionId: $selectionId)
  }
`
