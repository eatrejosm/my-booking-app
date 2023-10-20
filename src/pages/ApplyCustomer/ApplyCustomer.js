import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Row, Form, Input, Col, Button } from 'antd'
import axios from 'axios' 
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'
import { TimePicker, DatePicker } from 'antd';

const ApplyCustomer = () => {

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const {user} = useSelector(state=>state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/v1/users/register',{...values, userId: user._id});
      if (response.data.success) {
          dispatch(hideLoading())
          toast.success(response.data.message)
          toast("Redirecting to login page");
          navigateTo("/home");
      }else{
          toast.error(response.data.message)
      }
    }catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
        <h1 className='page-title'>Register Personal Data</h1>
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
          <h1 className='card-title'>Additional Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='customerDetails' name='customerDetails' rules={[{required: true}]}>
                <Input placeholder='Customer Details' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Attendance Count' name='attendanceCount' rules={[{required: true}]}>
                <Input placeholder='Attendance Count' type='number' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item label='Current Date' name='currentDate' rules={[{required: true, message: 'Please select the current date' }]}>
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <div className='d-flex justify-content-end'>
            <button type='primary' className='btn-apply' htmlType='submit'>Submit</button>
          </div>
        </Form>
    </Layout>

  )
}

export default ApplyCustomer