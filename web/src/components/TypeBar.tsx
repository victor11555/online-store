import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'

const TypeBar = observer(() => {
  const {device} = useContext(Context) 
  return (
    <ListGroup>
      {device.types.map(type => 
      <ListGroup.Item style={{cursor: 'pointer'}} onClick={()=>device.setSelectedType(type)} key={type.id} active={type.id === device.selectedType.id}>{type.name}</ListGroup.Item>)}
    </ListGroup>
  )
}
)
export default TypeBar