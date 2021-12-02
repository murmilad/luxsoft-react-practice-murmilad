import { Button, Modal } from 'react-bootstrap'
import { errorVar } from '../../cache';
import { useReactiveVar } from '@apollo/client'

function ErrorModal() {
  const errorModal = useReactiveVar(errorVar);
  return (
    <>
      { errorModal && <div className="modal_overlay" /> }
      <Modal show={errorModal} onHide={() => errorVar("")}>
        <Modal.Header closeButton>
          <Modal.Title role="error-message" >Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{errorModal}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => {errorVar("")}} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ErrorModal