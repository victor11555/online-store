import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'

type Props = {
  show: boolean,
  onHide: ()=>void
}

const CreateType = ({show, onHide}: Props) => {
const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(data =>{
      setValue('')
      onHide()
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control value={value} onChange={(e)=> setValue(e.target.value)} placeholder='Enter type name'/>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='outline-danger'>Close</Button>
        <Button onClick={addType} variant='outline-success'>Add</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType