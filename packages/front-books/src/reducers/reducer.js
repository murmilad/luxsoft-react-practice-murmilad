export const reducer = (state = { books: [], selections: { data: [] } }, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_FULFILLED":
      return {
        ...state,
        books: [
          ...action.payload.books
        ]
      }
    case "CREATE_BOOK_FULFILLED":
      return {
        ...state,
        selections: {
          ...state.selections,
          isPending: false,
          newSelection: null
        }
      }
    case "HIDE_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: false
        }
      }

    case "SHOW_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          message: action.payload.message,
          isShow: true
        }
      }

    default:
      return state
  }
}