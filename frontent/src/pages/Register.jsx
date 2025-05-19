import React, { useEffect, useRef } from 'react'
import background from '../assets/background-1.png'
import Input from '../components/Input'

const Register = () => {
  useEffect(() => {
    document.title = 'Register'
  }, [])
  return (
    <div 
      className='h-screen flex justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${background})`
      }}
      >
        <div className='w-lg bg-white top-5 right-5 border border-gray-500 px-5 py-10 opacity-90 shadow-lg'>
          <h1 className='text-2xl font-bold mb-4'>Create Account</h1>
          <div className='grid grid-cols-2 gap-4'>
          <Input 
            type="text" 
            placeholder="Doe" 
            id="first-name" 
            label="First name"/>
            <Input 
            type="text" 
            placeholder="John" 
            id="last-name" 
            label="Last name"/>
          </div>
          <Input 
            type="text" 
            placeholder="example@email.com" 
            id="email" 
            label="Email"/>
          <Input 
            type="text" 
            placeholder="0123456789" 
            id="phone" 
            label="Phone number"/>
          <Input 
            type="password" 
            placeholder="xxxxxx" 
            id="password" 
            label="Password"/>
          <Input 
            type="password" 
            placeholder="xxxxxx" 
            id="confirm-password" 
            label="Confirm password"/>

          <button className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 mb-4'>Register</button>
          <p>Already have an account? Click <a href="/login" className='text-blue-500 hover:underline'>here</a> to login.</p>
        </div>
      </div>
    
  )
}

export default Register