import React, { useState } from 'react'

const SearchShop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className='max-w-96 mx-auto mb-6'>
      <form method='GET' action={`http://localhost:5173/search`} className='w-full'>
        <input 
          type="text" 
          name='q'
          value={searchTerm}
          placeholder='Nhập tên sản phẩm muốm tìm...'
          className='w-full ring-1 ring-gray-300 shadow-sm p-2 rounded-md outline-none focus:shadow-lg focus:ring-2 transition-all duration-300'
          onChange={(e) => setSearchTerm(e.target.value)}/>
      </form>
    </div>
    
    
  )
}

export default SearchShop