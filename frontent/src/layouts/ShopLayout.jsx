import React from 'react'
import ShopHeader from '../components/Shop/ShopHeader'
import Footer from '../components/Shop/Footer'

const ShopLayout = ({ children }) => {
  return (
    <div className='w-full h-full inset-0'>
      <ShopHeader />
      <main className=' w-full py-20 px-10 lg:px-20 mt-10'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default ShopLayout