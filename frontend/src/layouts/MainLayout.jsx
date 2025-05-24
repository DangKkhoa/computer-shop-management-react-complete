import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { motion, AnimatePresence } from 'motion/react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'
import IsLoading from '../components/IsLoading'

const MainLayout = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   // if(isLoading) return <div>Đang tải</div>

  //   if(!user) {
  //     navigate('/user/login');
  //     return ;
  //   }

  //   if(user.role === 'ADMIN') {
  //     navigate('/dashboard');
  //     return ;
  //   }

  //   if(user.role === 'SALESPERSON') {
  //     navigate('/orders');
  //     return ;
  //   }

    
  // }, [user]);

  const location = useLocation();
  return (
    <div className='flex h-screen'>
      {isLoading ? 
      <IsLoading />
      :
      <>
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
      </>
      }
    </div>
  )
}

export default MainLayout