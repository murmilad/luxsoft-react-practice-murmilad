import { Accordion, Button } from "react-bootstrap"
import BookInSelection from "./BookInSelection";
import { errorVar } from '../../cache';
import { useQuery, useMutation } from '@apollo/client'
import { DELETE_SELECTION_MUTATION, GET_ALL_SELECTIONS  } from './graphql'

const Selection = (props) => {
  const { item } = props
  const [deleteSelection, { }] = useMutation(DELETE_SELECTION_MUTATION, {
    refetchQueries: [
      {
      query: GET_ALL_SELECTIONS,
      },
    ],
    onError: (event) => {
      return errorVar(event.message)
    } 
  })

  return (
    <>
      <Accordion.Item eventKey={props.itemKey}>
        <Accordion.Header>
          <span>
            <strong>{item.title}</strong> by <i>{item.author}</i>
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {item.books && item?.books.map((el, i) => {
            return <BookInSelection selectionId={item._id} bookId={el[0]} key={i} />
          })}
          <Button onClick={() => deleteSelection({ variables: { selectionId: item._id } })}
            className="remove_selection_btn"
            variant="outline-danger">
              Delete selection
          </Button>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export default Selection