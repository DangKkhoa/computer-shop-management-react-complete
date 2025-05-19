import React, { useEffect, useRef, useState, useContext } from 'react'

import background from '../assets/background-1.png'
import Input from '../components/Input'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router'


const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, [])

  const [error, setError] = useState('');

  const { user, login, isLoading } = useContext(AuthContext);
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user)
    if(user) {
      // console.log(user);
      if(user.role === 'ADMIN') {
        navigate('/dashboard');
      }
      else if(user.role === 'SALESPERSON') {
        navigate('/orders');
      }
      else if(user.role === 'ACCOUNTANT') {
        navigate('/sale-history');
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.username|| !input.password) {
      setError('Hãy nhập các thông tin cần thiết')
      return;
    }

    // const res = await login(input.username, input.password);
    try {
      const res = await login(input.username, input.password);

      if(res.status === 'success') {
        if(res.data.role === 'ADMIN') {
          // console.log('CLMMMMMMM');
          navigate('/dashboard');
        }
        else {
          // console.log('DMMMMMM');
          navigate('/orders');
        }

      }
      else {
        setError(res.message);
      }
    }
    catch(err){
      setError(err.response?.data.mesage);
    }
    

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });

    setError('');
  }


  return (
    <div 
      className='relative h-screen flex justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${background})`
      }}
      >
        <form 
          className='w-lg bg-white absolute top-5 right-5 border border-gray-500 px-5 py-10 opacity-90  shadow-lg'
          onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          <div className='mb-4'>
            <Input 
              type="text" 
              placeholder="example@email.com or 0123456789" 
              id="username" 
              name="username"
              label="Email or Phone number"
              onChange={handleInputChange}
              inputClass='w-full py-1 px-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500'/>
          </div>
          
          <div className='mb-4'>
            <Input 
              type="password" 
              placeholder="xxxxxx" 
              id="password" 
              name="password"
              label="Password"
              inputClass='w-full py-1 px-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500'
              onChange={handleInputChange}/>
          </div>
          <div className='text-red-500 italic mb-4'>{error}</div>
          <div className='flex justify-between items-center mb-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700'>Login</button>
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <p>Don't have an account? Click <a href="/customer/register" className='text-blue-500 hover:underline'>here</a>.</p>
        </form>
      </div>
    
  )
}

export default Login