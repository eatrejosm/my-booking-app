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
    console.log('form values:', values);
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/v1/users/apply-customer-profile',
        {
          ...values, 
          userId: user._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      dispatch(hideLoading())
      if (response.data.success) {
          toast.success(response.data.message)
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
              <Form.Item required label='Full Name' name='fullName' rules={[{required: true}]}>
                <Input placeholder='Full Name' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Email' name='email' rules={[{required: true}]}>
                <Input placeholder='Email' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Phone number' name='phonenumber' rules={[{required: true}]}>
                <Input placeholder='Phone number' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Address' name='address' rules={[{required: true}]}>
                <Input placeholder='Address' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='City' name='city' rules={[{required: true}]}>
                <Input placeholder='City' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Country' name='country' rules={[{required: true}]}>
                <Input placeholder='Country' />
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h1 className='card-title'>Additional Information</h1>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item required label='Customer Details' name='customerDetails' rules={[{required: true}]}>
                <Input placeholder='Customer Details' />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item label='Current Date' name='bookingDate' rules={[{required: true, message: 'Please select the date you want to book' }]}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}> 
              <Form.Item label='Booked Time' name='bookedTime' rules={[{required: true}]}>
                <TimePicker.RangePicker />
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