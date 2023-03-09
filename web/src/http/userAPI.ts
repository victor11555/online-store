import { $authHost, $host } from ".";
import jwt_decode from 'jwt-decode'

interface Token {
  email: string;
}


export const registartion = async (email:string, password:string) => {
  const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
  localStorage.setItem('token', data.token)
  return jwt_decode<Token>(data.token)
}

export const login = async (email:string, password:string) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode<Token>(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode<Token>(data.token)
}