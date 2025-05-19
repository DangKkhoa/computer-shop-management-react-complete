import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, NavLink } from 'react-router';
import { useNavigate } from 'react-router';

import { ChevronDown, LogOut, Settings } from 'lucide-react';


const Header = ({ title, children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => { 
    await logout();
    navigate('/login');
  }

  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDownOpened(!isDropDownOpened);
    console.log("Dropdown toggled", isDropDownOpened);
  }
  return (
    <header className='sticky top-0 z-10 bg-[rgba(255,255,255,0)] backdrop-blur-lg w-full p-5 shadow-md border-b border-gray-300 flex justify-between items-center'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <div className='flex items-center'>
        {children}
        {user && (
          <NavLink to="/profile" className='text-gray-800 text-lg ml-4 flex items-center hover:underline'>
            <div className='w-10 h-10 bg-cover bg-center bg-no-repeat rounded-full' style={{backgroundImage:`url(http://localhost:3000/uploads/users/${user.image})`}}></div>
            <span className='ml-4 font-semibold'>
              {user.firstname + " " + user.lastname}
            </span>
          </NavLink>
        )}
        <div className='relative ml-2'>
          <button onClick={handleDropDownToggle}>
            <ChevronDown />
          </button>
          {isDropDownOpened && <div className={`absolute z-10000 right-0 top-10 bg-white shadow-lg border border-gray-300 px-4 py-4 ${isDropDownOpened ? "block" : "hidden"}`}>
            <NavLink to="/settings" className='flex items-center px-4 py-2 hover:bg-gray-200 text-lg'><Settings /> <span className='ml-4'>Settings</span></NavLink>
            <NavLink onClick={handleLogout} className='flex items-center px-4 py-2 hover:bg-gray-200 text-lg'><LogOut /> <span className='ml-4'>Logout</span></NavLink>
          </div>}
          
        </div>

      </div>
    </header>
  )
}

export default Header