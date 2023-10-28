import React from 'react'
import './Login.css'
import { Header, Form,Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import logoImage from '../../assets/crm-logo.png'

const Login = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const onFinish = async (values) => {
      try {
        dispatch(showLoading())
        const response = await axios.post('/api/v1/users/login',values);
        dispatch(hideLoading())
        if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to home page")
            localStorage.setItem('token',response.data.data)
            navigateTo("/home")
        }else{
            toast.error(response.data.message)
        }
      }catch (error) {
        dispatch(hideLoading())
        toast.error("Something went wrong")
      }
    }

  return (
    <div>  
    <div className="logo-container"> 
              <div
                className="logo"
                style={{ backgroundImage: `url(${logoImage})` }}
              ></div>
          </div>
    
    <div className='bd-container'>
      
    <div className='item animated-photo'> </div>
     
       <div className='item authentication-form p-2'>
        <h1 className='card-title'>Login</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="Email" name='email' className='email'>
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item label="Contraseña" name='password' className='password' >
            <Input placeholder='Contraseña' type='password' />
          </Form.Item>
          <Button className='btn btn-primary my-3 ' htmlType='submit'>Accesar</Button>
          <Link to='/register' className='anchor mt-2'>No tienes cuenta? Registrate!</Link>
        </Form>
      </div>
    </div>
    </div>
  )
}

export default Login
