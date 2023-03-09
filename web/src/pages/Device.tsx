import React, { useEffect, useState } from 'react'
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap'
// import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI'

type DeviceI = {
  img: string, 
  name: string, 
  description: string,
  rating: number,
  price: number,
  info: [{id: number, title: string, description: string }]
}

const Device = () => {
  const [device, setDevice] = useState<DeviceI>({img: '', 
    name: '', 
    description: '',
    rating: 0,
    price: 0,
    info: [{id: 0, title: '', description: '' }]})
  const {id} = useParams()
  
  useEffect(()=>{
    fetchOneDevice(id as unknown as number).then(data => setDevice(data))
  })

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}>
          <Image src={process.env.REACT_APP_API_URL + device.img} width={300} height={300}/>
        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center'>
            <h2>{device.name}</h2>
            <div className='d-flex align-items-center justify-content-center' style={{background: `url(../assets/bigStar.png) no-repeat center center`, width: 240, height:240, backgroundSize: 'cover', fontSize: 64}}>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card className='d-flex flex-column align-items-center justify-content-around' style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgrey'}}>
            <h3>From {device.price} £</h3>
            <Button variant='outline-dark'>Add to basket</Button>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Tech specs</h1>
        {device.info.map((info, index) => <Row key={info.id} style={{background: index%2===0 ? 'lightgray' : 'transparent'}}>{info.title}: {info.description}</Row>)}
      </Row>
    </Container>
  )
}

export default Device