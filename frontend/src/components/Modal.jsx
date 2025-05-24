import React from 'react'
import { motion } from "motion/react"

const Modal = ({ ...props }) => {
  if(!props.isOpen) return null;

  return (
    <div className='fixed inset-0 top-0 z-50 flex items-center justify-center bg-black/50' onClick={props.onClose}>
      <motion.div 
        initial={{scale: 0}}
        animate={{scale: 1}}
        className='relative z-100 bg-white p-6 showdow-lg w-full max-w-md' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-xl font-semibold'>{props.title}</h2>        
        <p className='text-gray-700 mb-4'>{props.message}</p>

        <div className='flex justify-end space-x-3'>
          <button
            className='px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200'
            onClick={props.onClose}>
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white transition-colors duration-200'
            onClick={props.onConfirm}>
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Modal