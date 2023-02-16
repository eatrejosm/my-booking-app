import React, {useEffect} from 'react'
import axios from 'axios'

const HomePage = () => {

    const getData = async () => {
        try {
            const response = await axios.post('/api/v1/users/user-data',
            {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(() => {
   getData()
}, [])


  return (
    <div>
      HomePage
    </div>
  )
}

export default HomePage
