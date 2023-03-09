import React from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/constants'

type Props = {device:{ id: number; name: string; price: number; rating: number; img: string; }}

const DeviceItem = ({device}:Props) => {
  const navigate = useNavigate()
  return (
    <Col md={3} className='mt-3' onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{width: 150, cursor: 'pointer'}}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className='mt-1 d-flex justify-content-between align-items-center'>
          <div className='text-black-50'>Samsung</div>
          <div className='d-flex align-items-center'>
            <div>{device.rating}</div>
            <Image width={14} height={14} src={'../assets/star.png'}/>
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
}

export default DeviceItem