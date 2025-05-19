import React from 'react'
import { motion } from 'motion/react'

import userImg from '../assets/user-default.png'
import { Eye, Trash2, Lock, LockOpen } from 'lucide-react'

const UserCard = ({ ...props }) => {
  
  return (
    <motion.div   
      whileHover={{borderRadius: 15}}
      transition={{duration: .1}}
      className="group relative bg-white text-sm text-center border border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <button 
        className="absolute top-2 right-2 opacity-0 text-red-500 hover:scale-110 group-hover:opacity-100 transition duration-300"
        onClick={() => props.deleteUser(props.id, props.name)}>
          <Trash2 />
      </button>
      <div className='p-4'>
        <div 
          className='bg-cover bg-no-repeat w-24 h-24 rounded-full mb-4 mx-auto' 
          style={{ backgroundImage: `url(${userImg})` }}
        ></div>

        <h2 className="text-xl font-semibold mb-2">{props.name}</h2>
        <p className="text-gray-600 mb-2">{props.role}</p>
        <p className="text-gray-600 mb-2">{props.email}</p>
        <div className='flex justify-center items-center gap-4'>
          <button className="bg-gradient-to-tl bg-sky-400  px-3 py-2 hover:bg-sky-500 transition-all duration-300 flex items-center font-semibold"><Eye className='mr-2'/> Xem</button>
          <button 
            className='bg-gradient-to-tr bg-amber-400 px-3 py-2 hover:bg-amber-500 transition-all duration-300 flex items-center text-nowrap font-semibold'
            onClick={() => props.isLocked ? props.unLockUser() : props.lockUser()}>
              {!props.isLocked ? 
                (
                  <>
                    <Lock className='mr-2'/> Khóa
                  </>
                )
                :
                (
                  <>
                    <LockOpen className='mr-2'/> Mở khóa
                  </>
                )
              }
          </button>
        </div>
      </div>
      

    </motion.div>
  )
}

export default UserCard