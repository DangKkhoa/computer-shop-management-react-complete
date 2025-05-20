import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router';

const RoleRoute = ({ children, allowRoles, allowEdit }) => {

  const { user, isLoading } = useContext(AuthContext);

  if(isLoading) {
    return <div className='p-6 text-center text-gray-800 text-lg'>Loading...</div>
  }

  console.log(user);
  // if(!user && isLoading) {
  //   console.log("User not found");
  //   // return <Navigate to="/login" />
  //   return <div className='p-6 text-center text-gray-800 text-lg'>Loading...</div>
  //   // return <Navigate to="/unauthorized" />
  // }

  if(!user) {
    console.log('no user found');
    return ;
  }

  if(user && !allowRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }


  return children;

}

export default RoleRoute