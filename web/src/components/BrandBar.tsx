import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Card, Row } from 'react-bootstrap'
import { Context } from '..'

const BrandBar = observer(() => {
  const {device} = useContext(Context) 

  return (
    <Row className="d-flex">
      {device.brands.map(brand => 
      <Card className='p-3' style={{cursor: 'pointer', width: 150}}key={brand.id} onClick={()=>device.setSelectedBrand(brand)} border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}>{brand.name}</Card>)}
    </Row>
  )
}
)
export default BrandBar