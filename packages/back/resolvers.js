

const booksAPI = require( './datasources/books')
const selectionsAPI= require('./datasources/selections')

const BOOK_ADDED = "BOOK_ADDED";
const SELECTION_ADDED = "SELECTION_ADDED";

module.exports = {
  Query: {
    allBooks: async (_, {}, { dataSources }) => {
      return await booksAPI.getBooks({});
    },
    allSelections: async (_, {}, { dataSources }) => {
      return await selectionsAPI.getSelections({});
    },
    getBook: async (_, { id }, { dataSources }) => {
      return await booksAPI.getBook(id);
    },
    getSelection: async (_, { id }, { dataSources }) => {
      return await selectionsAPI.getSelection(id);
    },
  },
  Mutation: {
    addBook: async (_, { book }, { dataSources }) => {
      const newBook = await booksAPI.addBook(book);
//      await pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      if (newBook) return newBook;
    },
    editBook: async (_, { bookId, book }, { dataSources }) => {
      return await booksAPI.editBook(bookId, book);
    },
    deleteBook: async (_, { bookId }, { dataSources }) => {
      return await booksAPI.deleteBook(bookId);
    },

    addSelection: async (_, { selection }, { dataSources }) => {
      const newSelection = await selectionsAPI.addSelection(selection);
      if (newSelection) return newSelection;
    },
    editSelection: async (_, { selectionId, selection }, { dataSources }) => {
      return await selectionsAPI.editSelection(selectionId, selection);
    },
    addBooksToSelection: async (_, { selectionId, books }, { dataSources }) => {
      const selection = await selectionsAPI.addBooksToSelection(
        selectionId,
        books
      );
      if (selection) return selection;
      return null;
    },
    deleteBookFromSelection: async (_, { selectionId, bookId }, { dataSources }) => {
      const selection = await selectionsAPI.deleteBookFromSelection(
        selectionId,
        bookId
      );
      if (selection) return selection;
      return null;
    },
    deleteSelection: async (_, { selectionId }, { dataSources }) => {
      return await selectionsAPI.deleteSelection(selectionId);
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
    },
    selectionAdded: {
      subscribe: () => pubsub.asyncIterator([SELECTION_ADDED])
    }
  }
};
