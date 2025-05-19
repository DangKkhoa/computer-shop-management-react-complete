import { Boxes, ChartArea, ChartGantt, Menu, ShoppingBag, ShoppingCart, UserCheck, Users } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import Tooltip from './Tooltip'
import { AuthContext } from '../context/AuthContext'


const navItems = [
  {path: "/", name: "Shop", icon: ShoppingBag, active: false, roles: ["*"]},
  {path: "/dashboard", name: "Dashboard", icon: ChartArea, active: false, roles: ["ADMIN"]},
  {path: "/orders", name: "Đơn hàng", icon: ShoppingCart, active: false, roles: ["ADMIN", "SALESPERSON"]},
  {path: "/inventory", name: "Quản lí kho", icon: Boxes, active: false, roles: ["ADMIN", "SALESPERSON"]},
  {path: "/customers", name: "Khách hàng", icon: Users, active: false, roles: ["ADMIN", "SALESPERSON"]},
  {path: "/users", name: "Nhân viên", icon: UserCheck, active: false, roles: ["ADMIN"]},
  {path: "/sale-history", name: "Lịch sử mua bán", icon: ChartGantt, active: false, roles: ["ADMIN", "ACCOUNTANT"]},
]
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { user } = useContext(AuthContext);
  // console.log(user);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (

    <div 
      className={`relative h-screen w-20 md:w-64 bg-[rgba(255,255,255,0.6)]  border-r border-gray-300 shadow-xl ${isSidebarOpen && "overflow-hidden"} p-4 transition-all duration-300 ease-in-out `}
      style={{width: isSidebarOpen ? "256px" : "80px"}}>
        <button className=''>
          <Menu 
            size={24}
            onClick={handleSidebarToggle}/>
        </button>
        <nav className='text-md font-semibold '>
          {user && navItems.map(item => {
            if(item.roles.includes("*") || item.roles.includes(user.role)) {
              return (<NavLink 
                to={item.path}
                className={({isActive}) => "group flex mt-2 px-2 py-4 hover:scale-105 transition-all duration-200 " + (isActive ? "bg-gradient-to-bl bg-sky-100 text-gray-700" : "hover:bg-sky-100")}
              >
                  {<item.icon size={24} style={{minWidth: "24px"}} />}
                  {!isSidebarOpen && (
                    <div className=' hidden group-hover:block z-1000'> 
                      <Tooltip content={item.name} />
                    </div>
                  )}
                  {/* {!isSidebarOpen && (<Tooltip content={item.name} />)} */}
                  <span className={`ml-2 ${!isSidebarOpen ? "opacity-0" : "opacity-100"} delay-100 whitespace-nowrap`}>{item.name}</span>
              </NavLink>) 
            }
          })}
        </nav>
    </div>
  )
}

export default Sidebar