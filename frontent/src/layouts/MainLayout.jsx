import React from 'react'
import Sidebar from '../components/Sidebar'
import { motion, AnimatePresence } from 'motion/react'
import { Outlet, useLocation } from 'react-router'

const MainLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <AnimatePresence mode='wait'>
        <motion.div 
        key={location.pathname}
        exit={{opacity: 0}}
        transition={{duration: .2}}
        className='flex-1 overflow-auto'>
          <Outlet />
        </motion.div>
      </AnimatePresence>
     
    </div>
  )
}

export default MainLayout