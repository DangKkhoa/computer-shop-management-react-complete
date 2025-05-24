import React from 'react'
import { Github } from 'lucide-react'

const Footer = () => {
  return (
    <div className='w-full bottom-0 flex items-center justify-center h-32 bg-black text-white'>
      <div className='w-full'>
        <p className='text-center'>Product developed by @Dkkhoa</p>
        <div className='w-full flex items-center justify-center'>
          <Github className='mr-1'/> <span className='mr-1'>You can find the source code</span> 
            <a 
              href="https://github.com/DangKkhoa/react-computer-management" 
              target='_blank'
              className='text-blue-300 hover:text-blue-400 hover:underline'> 
              here
            </a>
          <Github className='ml-1'/>
        </div>
      </div>
      
    </div>
  )
}

export default Footer