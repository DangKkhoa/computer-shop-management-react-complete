import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import { useParams } from 'react-router'
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const [staffInfo, setStaffInfo] = useState(null);
  
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/users/${id}`, { withCredentials: true });
        if(res.status === 200) {

          setStaffInfo(res.data.data);
        }
      }
      catch(err) {
        console.error(err.message);
        alert("Có lỗi xảy ra khi lấy thông tin người dùng");
      }
    }

    fetchStaffData();
  }, [id])
  return (
    <>
      {staffInfo && <Profile staffInfo={staffInfo}/>}
    </>
  )
}

export default UserProfile