import React from 'react'
import Sidebar from '../components/Sidebar'
import { motion, AnimatePresence } from 'motion/react'
import { useLocation } from 'react-router'

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.div 
        key={location.pathname}
        exit={{y: 100, opacity: 0}}
        transition={{duration: .3}}
        className='flex-1 overflow-auto'>
          {children}
        </motion.div>
      </AnimatePresence>
     
    </div>
  )
}

export default MainLayout