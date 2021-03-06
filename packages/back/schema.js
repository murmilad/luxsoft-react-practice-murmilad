//{"author":"Pushkin","title":"Eugene Onegin","_id":"DBHxziigSiIQsAGY"}
//{"title":"Best of Best","author":"Vladson","email":"","_id":"vjoAbFpVQvZdnKtq","books":[["DBHxziigSiIQsAGY"],["WKiD2xJqCnlrIzir"]]}

const { gql } = require("graphql-tag");

module.exports = gql`

type Book {
    _id: ID!
    author: String
    title: String
  }

  type Selection {
    _id: ID!
    title: String
    author: String
    email: String
    books: [Book!]
  }

  input NewBookInput {
    author: String!
    title: String!
  }

  input EditBookInput {
    _id: ID!
    author: String!
    title: String!
  }


  input NewSelectionInput {
    title: String!
    author: String!
    email: String
  }

  input EditSelectionInput {
    _id: ID!
    title: String!
    author: String!
    email: String
  }
  input BookInput {
    _id: ID!
  }
  type Query {
    allBooks: [Book!]!
    allSelections: [Selection!]!
    getBook(id: ID!): Book
    getSelection(id: ID!): Selection
  }

  type Mutation {
    addBook(book: NewBookInput): Book!
    editBook(bookId: ID!, book: EditBookInput): Book!
    deleteBook(bookId: ID!): String

    addSelection(selection: NewSelectionInput): Selection!
    editSelection(selectionId: ID!, selection: EditSelectionInput): Selection!
    deleteSelection(selectionId: ID!): String

    addBooksToSelection(selectionId: ID!, books: [BookInput!]!): Selection!
    deleteBookFromSelection(selectionId: ID!, bookId: ID!): Selection!
  }

  type Subscription {
    bookAdded: Book
    selectionAdded: Selection
  }
`;

