export const reducer = (state = { books: [], selections: { data: [] } }, action) => {
  switch (action.type) {
    case "FETCH_SELECTIONS_FULFILLED":
      return {
        ...state,
        selections: {
          ...state.selections,
          data: action.payload
        },
      }
    case "REMOVE_BOOK_FROM_SELECTION":
      return {
        ...state,
        book: {
          selectionId: action.payload.selectionId,
          bookId: action.payload.bookId
        }
      }
    case "CREATE_SELECTION":
      return {
        ...state,
        selections: {
          ...state.selections,
          ...action.payload,
        }
      }
    case "CREATE_SELECTION_FULFILLED":
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