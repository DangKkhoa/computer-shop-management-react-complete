import React from 'react'
import ShopHeader from '../components/Shop/ShopHeader'
import Footer from '../components/Shop/Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

const ShopLayout = ({ children }) => {
  return (
    <div className='w-full h-full inset-0'>
      <ShopHeader />
      <main className=' w-full pb-20 pt-28 px-10 lg:px-20'>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}

export default ShopLayout