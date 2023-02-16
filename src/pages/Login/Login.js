import React from 'react'
import './Login.css'
import { Form,Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = () => {
    const navigateTo = useNavigate();
    const onFinish = async (values) => {
      try {
        const response = await axios.post('/api/v1/users/login',values);
        if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to home page")
            localStorage.setItem('token',response.data.data)
            navigateTo("/home")
        }else{
            toast.error(response.data.message)
        }
      }catch (error) {
        
      }
    }

  return (
    <div className='authentication'>
      <div className='authentication-form card p-2'>
        <h1 className='card-title'>Login</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name='email'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Contraseña" name='password'>
            <Input placeholder='Contraseña' type='password' />
          </Form.Item>
          <Button className='btn btn-primary my-3 ' htmlType='submit'>Accesar</Button>
          <Link to='/register' className='anchor mt-2'>No tienes cuenta? Registrate!</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login
