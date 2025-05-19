import React, { useEffect, useState } from 'react'
import background from '../assets/background-1.png'
import Input from '../components/Input'

const CODE = '48820';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = 'Forgot password'
  }, [])

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
    
  }

  const validateCode = () => {
    if (code === CODE) {
      setCodeValidated(true);
      
    }
    else {
      alert('Invalid code');
    }
  }

  
  

  
  return (
    <div 
      className='h-screen flex justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${background})`
      }}
      >
      <div className='w-lg bg-white  top-5 right-5 border border-gray-500 px-5 py-10 opacity-90  shadow-lg'>
        <h1 className='text-2xl font-bold mb-4'>Forgot Password</h1>
        {!isConfirmed && <>
            <Input 
            type="text" 
            placeholder="example@email.com or 0123456789" 
            id="email" 
            label="Email or Phone number"
            value={email}
            onChange={handleEmailChange}/>
            <button 
              className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 mb-4'
              onClick={() => setIsConfirmed(true)}>Next &rarr;
            </button>
          </>
        }
        {isConfirmed && !codeValidated && <>
            <p className='mb-2'>Enter code sent to: <b>{email}</b></p>
            <Input 
            type="text" 
            placeholder="XXXXX" 
            id="code" 
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}/>
            <button 
              className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 mb-4'
              onClick={() => validateCode()}>
                Next &rarr;
            </button>
          </>
          
        }
        {codeValidated && (
          <>
            <Input 
              type="password" 
              placeholder="xxxxxx" 
              id="password" 
              label="New password"/>
            <Input 
              type="password" 
              placeholder="xxxxxx" 
              id="confirm-password" 
              label="Confirm password" />
            
            <button className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 mb-4'>
                Change password 
            </button>
          </>
          
        )}
        <p>Click <a href="/login" className='text-blue-500 hover:underline'>here</a> to login.</p>
      </div>
        
    </div>
    
  )
}

export default ForgotPassword