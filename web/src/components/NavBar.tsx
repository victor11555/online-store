import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Context } from '..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { observer } from "mobx-react-lite" 
import { useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to={SHOP_ROUTE}>Store</NavLink>
          {user._isAuth ? 
            <Nav className="ml-auto">
              <Button variant='outline-light' onClick={()=>navigate(ADMIN_ROUTE)}>Admin panel</Button>
              <Button variant='outline-light' onClick={logOut}>Log out</Button>
            </Nav>
            :
            <Nav className="ml-auto">
              <Button variant='outline-light' onClick={()=>navigate(LOGIN_ROUTE)}>Sign in</Button>
            </Nav>
          }
        </Container>
      </Navbar>
  )
}
)

export default NavBar