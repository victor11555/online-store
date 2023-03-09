import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Dropdown, Col, Row } from 'react-bootstrap'
import { Context } from '../..'
import { fetchTypes, fetchBrands, createDevice } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

type Props = {
  show: boolean,
  onHide: ()=>void
}

interface HTMLInputEvent extends React.ChangeEvent {
  target: EventTarget & Element
}

const CreateDevice = observer(({show, onHide}: Props) => {
  const {device} = useContext(Context)
  const [info, setInfo] = useState<{title: string, description: string, number: number}[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState<File | string>('')

  const addSpec = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeSpec = (number: number) => {
    setInfo(info.filter(i=> i.number !== number))
  }

  const changeSpec = (key: string, value: string, number: number) => {
    setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item))
  }

  const selectFile = (e: HTMLInputEvent) => {
    setFile(() => {
      let target = (e?.target as HTMLInputElement);
      if (target.files) return '';
      return target.files ? target.files[0] : ''
    })
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', `${device.selectedBrand.id}`)
    formData.append('typeId', `${device.selectedType.id}`)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }

  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrands().then(data=>device.setBrands(data))
  })

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
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedType.name || "Choose type"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =><Dropdown.Item onClick={(()=>device.setSelectedType(type))} key={type.id}>{type.name}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>{device.selectedBrand.name || "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =><Dropdown.Item onClick={(()=>device.setSelectedBrand(brand))} key={brand.id}>{brand.name}</Dropdown.Item>)}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control value={name} onChange={e=>setName(e.target.value)}className='mt-3' placeholder='Enter name'/>
          <Form.Control value={price} onChange={e=>setPrice(Number(e.target.value))}className='mt-3' placeholder='Enter price' type='number'/>
          <Form.Control className='mt-3' onChange={e=> selectFile(e)} placeholder='Enter image' type='file'/>
          <hr/>
          <Button variant='outline-dark' onClick={addSpec}>Add new spec</Button>
          {info.map(item => <Row className='mt-3' key={`${item.number}`}>
            <Col md={4}><Form.Control value={item.title} onChange={(e)=>changeSpec('title', e.target.value, item.number)}placeholder='Enter title'/></Col>
            <Col md={4}><Form.Control value={item.description} onChange={(e)=>changeSpec('description', e.target.value, item.number)}placeholder='Enter description'/></Col>
            <Col md={4}><Button variant='outline-danger' onClick={()=>removeSpec(item.number)}>Delete</Button></Col>
            </Row>)}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant='outline-danger'>Close</Button>
        <Button onClick={addDevice} variant='outline-success'>Add</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice