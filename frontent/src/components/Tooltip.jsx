import React from 'react'

const Tooltip = ({ content }) => {
  return (
    <div className='absolute z-1000 w-fit bg-white text-gray-800 text-nowrap opacity-90 shadow-lg border border-gray-400 text-sm p-2'>
      {content}
    </div>
  )
}

export default Tooltip