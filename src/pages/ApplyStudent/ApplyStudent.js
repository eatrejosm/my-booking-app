import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Row, Form, Input, Col, Button } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/alertsSlice'
import { Link, useNavigate } from 'react-router-dom'

const ApplyStudent = () => {

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const {user} = useSelector(state=>state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/v1/users/register',values);
      if (response.data.success) {
          dispatch(hideLoading())
          toast.success(response.data.message)
          toast("Redirecting to login page")
          navigateTo()
      }else{
          toast.error(response.data.message)
      }
    }catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout>
        <h1 className='page-title'>ApplyStudent</h1>
          <hr />
        <Form className='form-container' layout='vertical' onFinish={onFinish}>
        <h1 className='card-title'>Personal Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Full Name' name='fullname' rules={[{required: true}]}>
                <Input placeholder='Full Name' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='email' name='email' rules={[{required: true}]}>
                <Input placeholder='email' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='phone number' name='phonenumber' rules={[{required: true}]}>
                <Input placeholder='phone number' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='address' name='address' rules={[{required: true}]}>
                <Input placeholder='address' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='city' name='city' rules={[{required: true}]}>
                <Input placeholder='city' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='country' name='country' rules={[{required: true}]}>
                <Input placeholder='country' />
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h1 className='card-title'>BJJ Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Experience' name='experience' rules={[{required: true}]}>
                <Input placeholder='Experience' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Skills' name='skills' rules={[{required: true}]}>
                <Input placeholder='Skills' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='stripes' name='stripes' rules={[{required: true}]}>
                <Input placeholder='stripes' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Class Count' name='classCount' rules={[{required: true}]}>
                <Input placeholder='Class Count' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='belt' name='belt' rules={[{required: true}]}>
                <Input placeholder='aaa' />
              </Form.Item>
            </Col>
          </Row>
          <div className='d-flex justify-content-end'>
            <button type='primary' className='btn-primary' htmlType='submit'>Submit</button>
         
          </div>
        </Form>
    </Layout>

  )
}

export default ApplyStudent