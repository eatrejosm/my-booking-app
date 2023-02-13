import React from 'react'
import './Login.css'
import { Form,Input, Button } from 'antd'
import { Link } from 'react-router-dom'

const Login = () => {

    const onFinish = values => {
        console.log('form values',values)
    }

  return (
    <div className='authentication'>
      <div className='authentication-form card p-2'>
        <h1 className='card-title'>Login</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Usuario" name='name'>
            <Input placeholder='Usuario' />
          </Form.Item>
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
