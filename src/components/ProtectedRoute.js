import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import axios from 'axios'

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUser = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        '/api/v1/users/userdata-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      dispatch(hideLoading())
      if (response.data.success) {
        dispatch(setUser(response.data.data))
      } else {
        localStorage.clear()
        navigate('/login')
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      console.log(error)
      navigate('/login')
    }
  }
  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user])

  if (localStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }
}
export default ProtectedRoute
