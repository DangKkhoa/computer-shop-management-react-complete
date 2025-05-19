import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { ImageUp, SquarePen, X, Check, Lock } from 'lucide-react'
import Input from '../components/Input'
import { useNavigate, useSearchParams } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {
  useEffect(() => {
    document.title = 'Trang cá nhân';
  })
  const { user, setUser } = useContext(AuthContext);
  const [ searchParams ] = useSearchParams();
  const editable = searchParams.get('editable') === 'true';
  // console.log(editable)
  const navigate = useNavigate();

  const [preview, setPreview] = useState(`http://localhost:3000/uploads/users/${user.image}`);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState(user);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      // console.log(file)
      setSelectedImage(file);
      const imgURL = URL.createObjectURL(file);
      
      setPreview(imgURL);
    }
  }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prev => ({...prev, [name]: value}));
  }

  const isChanged = JSON.stringify(updatedInfo) != JSON.stringify(user) || selectedImage != null;
  console.log(isChanged);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      Object.entries(updatedInfo).forEach(([key, val]) => {
        if(key != 'password' && key != 'image') {
          formData.append(key, val);
        }
      })

      if(selectedImage) {
        console.log(selectedImage);
        formData.append('image', selectedImage);
      }
      
      for(let [key, value] of formData) {
        console.log(key, value)
      }

      const res = await axios.patch(`http://localhost:3000/api/v1/users/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if(res.status === 200) {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 2000,
          onClose: () => navigate('/profile')
        })

        setUser(res.data.data);
      }
      
      
    }
    catch(err) {
      console.error(err);
      
      toast.error(err?.response?.data?.message, {
        position: 'top-right',
        autoClose: 2000,  
      })
    }
  }

  return (
    <div>
      <Header title="Trang cá nhân" />
      <main className='w-full mt-6 p-6'>
        <div className='w-full flex flex-col items-center gap-y-4'>
          <div 
            className='w-48 h-48 bg-cover bg-center bg-no-repeat rounded-md'
            style={{backgroundImage: `url(${preview})`}}>
          </div>
          {editable && <label htmlFor="image" className='cursor-pointer text-sky-500 flex'>
            <ImageUp />
            <span className='text-md font-semibold'>Đổi ảnh đại diện</span>
            <input 
              type='file' 
              id='image' 
              className='hidden'
              onChange={handleImageChange}/>
          </label>}
          <div className='w-3/4 grid grid-cols-2 gap-4'>
            <div className='bg-gray-100 p-4 rounded-md'>
              <Input 
                type='text'
                id='firstname'
                name='firstname'
                label='Họ'
                value={updatedInfo.firstname}
                labelClass='text-gray-400 font-semibold'
                inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                readOnly={!editable}
                onChange={handleValueChange}/>
            </div>
            <div className='bg-gray-100 p-4 rounded-md'>
              <Input 
                type='text'
                id='lastname'
                name='lastname'
                label='Tên'
                value={updatedInfo.lastname}
                labelClass='text-gray-400 font-semibold'
                inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                readOnly={!editable}
                onChange={handleValueChange}/>
            </div>
            <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type='email'
                  id='email'
                  name='email'
                  label='Email'
                  value={updatedInfo.email}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={!editable}
                  onChange={handleValueChange}/>
              </div>
              <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type='text'
                  id='phonenumber'
                  name='phonenumber'
                  label='Số điện thoại'
                  value={updatedInfo.phonenumber}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={!editable}
                  onChange={handleValueChange}/>
                
              </div>
              <div className='bg-gray-100 p-4 rounded-md'>
                <Input 
                  type='text'
                  id='gender'
                  label='Giới tính'
                  value={user.gender === 'MALE' ? "NAM" : "NỮ"}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={true}
                  icon={<Lock size={20} className='ml-1'/>}/>
              </div>
              
              <div className='col-span-full mt-4 flex gap-4 '>
                {editable ? (
                  <>
                    <button className='bg-gray-300 text-lg font-semibold px-4 py-3 rounded-md flex items-center' onClick={() => navigate('/profile', { replace: false })}><X className='mr-2'/> Hủy bỏ</button>
                    <button 
                      className='bg-green-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center disabled:opacity-50'
                      disabled={!isChanged}
                      onClick={handleUpdateProfile}>
                        <Check className='mr-2'/> Xác nhận
                    </button>
                  </>
                )
                :
                <button className='bg-amber-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center' onClick={() => navigate('/profile?editable=true', { replace: false })}><SquarePen className='mr-1'/> Chỉnh sửa</button>
              }
              </div>
          </div>         
        </div>
        <ToastContainer />
      </main>
    </div>
  )
}

export default Profile