import React from 'react'
import './Register.css'
import { Form,Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/alertsSlice'


const Register = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const onFinish = async (values) => {
      try {
          dispatch(showLoading())
          const response = await axios.post('/api/v1/users/register',values);
          if (response.data.success) {
              toast.success(response.data.message)
              toast("Redirecting to login page")
              navigateTo("/login")
          }else{
              toast.error(response.data.message)
          }
      }catch (error) {
        dispatch(hideLoading())
        toast.error("Something went wrong")
      }
    }

  return (
    <div className='authentication'>
      <div className='authentication-form card p-2'>
        <h1 className='card-title'>Registrate</h1>
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
          <Button className='btn btn-primary my-3 ' htmlType='submit'>Registrarse</Button>
          <Link to='/login' className='anchor mt-2'>Ya tienes una cuenta? Logueate</Link>
        </Form>
      </div>
    </div>
  )
}

export default Register
