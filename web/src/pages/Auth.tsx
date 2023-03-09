import React, { useContext, useState } from 'react'
import { Card, Container, Form, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'
import { login, registartion } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { observer } from 'mobx-react-lite'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data: object;
      if(isLogin){
        data = await login(email, password)
      } else {
        data = await registartion(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTE)
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Container className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight - 54}}>
      <Card style={{width: 600}} className="p-5">
        <h2 className='m-auto'>{isLogin ? 'Log in' : 'Sign up'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control placeholder='Enter email' className='mt-3' value={email} onChange={e => setEmail(e.target.value)}/>
          <Form.Control placeholder='Enter password' className='mt-3' value={password} onChange={e => setPassword(e.target.value)} type='password'/>
          <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
          {isLogin ? <div style={{width: 400}}> Don't have an account yet? : <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink></div>
          :
          <div  style={{width: 400}} > Already have an account? : <NavLink to={LOGIN_ROUTE}>Log in</NavLink></div> }
            <Button style={{width: 100}} variant='outline-success' onClick={click}>{isLogin ? 'Log in' : 'Sign up'}</Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}
)

export default Auth