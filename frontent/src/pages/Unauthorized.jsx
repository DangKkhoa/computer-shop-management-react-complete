import React from 'react'
import { Link } from 'react-router'

const Unauthorized = () => {
  return (
    <div className='ml-4 pt-4'>
      <h1 className='text-4xl font-bold text-red-500 mb-4'>You don't have permission to access this page!!!</h1>
      <Link to="/profile" className='text-lg mt-4 underline hover:text-blue-800'>Click here to go to profile page</Link>
    </div>
  )
}

export default Unauthorized