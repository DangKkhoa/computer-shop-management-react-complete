import React from 'react'
import { motion } from "motion/react"

const DashboardCard = ({ title, content, icon:Icon, color }) => {
  const colorMap = {
    'bg-purple-300': 'from-purple-100',
    'bg-blue-300': 'from-sky-100',
    'bg-green-300': 'from-green-100',
    'bg-amber-300': 'from-amber-100'
  }
  const bgClass = `bg-gradient-to-br ${colorMap[color] || 'from-blue-100'} to-white py-8 px-4 border border-gray-300`

  return (
    <motion.div 
      whileHover={{scale: 1.1, borderRadius: 15, boxShadow: "0 1px 30px -10px rgba(0, 0, 0, .25)"}}
      transition={{duration: .2}}
      className={bgClass}>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg xl:text-xl text-gray-500 font-semibold mb-4 whitespace-nowrap'>{title}</h2>
          <p className='text-gray-800 text-2xl font-semibold'>{content}</p>
        </div>

        <div className={`${color} p-2 rounded-full`} style={{backgroundColor: color}}>
          <Icon size={20}/>
        </div>
        
      </div>
    </motion.div>
  )
}

export default DashboardCard