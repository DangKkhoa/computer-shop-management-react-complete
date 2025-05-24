import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { ImageUp, SquarePen, X, Check, Lock } from 'lucide-react'
import Input from '../components/Input'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import UploadImage from '../components/UploadImage'

const Profile = ({staffInfo}) => {
  useEffect(() => {
    document.title = 'Trang cá nhân';
  })

  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [ searchParams ] = useSearchParams();
  const editable = searchParams.get('editable') === 'true';
  // console.log(editable)
  const navigate = useNavigate();

  const [preview, setPreview] = useState(`http://localhost:3000/uploads/users/${staffInfo?.image || user.image}`);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState(staffInfo || user);

  const roles = {
    "SALESPERSON": ["ADMIN", "ACCOUNTANT"],
    "ACCOUNTANT": ["ADMIN", "SALESPERSON"]
  }

  const genders = {
    "MALE": "FEMALE",
    "FEMALE": "MALE"
  }


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
    console.log(name + ": " + value);
  }

  const isChanged = JSON.stringify(updatedInfo) != JSON.stringify(staffInfo || user) || selectedImage != null;
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
      
      // for(let [key, value] of formData) {
      //   console.log(key, value)
      // }

      const res = await axios.patch(`http://localhost:3000/api/v1/users/${staffInfo?.id || user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if(res.status === 200) {
        toast.success(res.data.message, {
          position: 'top-right',
          autoClose: 2000,
          onClose: () => navigate(staffInfo ? `/users/${staffInfo?.id}` : '/profile')
        })

        if(!staffInfo) {
          setUser(res.data.data);
        }
        
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
          <div className='text-center text-gray-400 font-semibold text-lg'>
            <p>Mã NV: {staffInfo?.id || user.id}</p>
            <p>Ngày gia nhập: {staffInfo?.created_at && new Date(staffInfo?.created_at).toLocaleDateString() || ''}</p>
          </div>
          {editable && <UploadImage title='Chọn ảnh đại diện mới' handleImageChange={handleImageChange}/>}
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
                {user.role !== 'ADMIN' ? <Input 
                  type='text'
                  id='gender'
                  label='Giới tính'
                  value={user.gender === 'MALE' ? "NAM" : "NỮ"}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={true}
                  icon={<Lock size={20} className='ml-1'/>}/>
                  :
                  <>
                    <label htmlFor="gender" className='text-gray-400 font-semibold mb-2 flex items-center'>Giới tính <Lock size={20} className='ml-1'/></label>
                    <select 
                      name="gender"
                      id="gender"
                      onChange={handleValueChange}
                      className='w-full flex justify-between'
                      disabled={!editable}>
                      <option value={updatedInfo.gender}>{updatedInfo.gender}</option>
                      <option value={genders[updatedInfo.gender]}>{genders[updatedInfo.gender]}</option>
                    </select>
                  </>
                }
                  
              </div>
              {(user.role === 'ADMIN' && staffInfo) && <div className='bg-gray-100 p-4 rounded-md'>
                {/* <Input 
                  type='text'
                  id='gender'
                  label='Giới tính'
                  value={user.gender === 'MALE' ? "NAM" : "NỮ"}
                  labelClass='text-gray-400 font-semibold'
                  inputClass='w-full text-gray-800 text-lg font-semibold outline-none'
                  readOnly={true}
                  icon={<Lock size={20} className='ml-1'/>}/> */}
                  <label htmlFor="role" className='block mb-2 text-gray-400 font-semibold'>Vị trí</label>
                  <select name="role" id="role" className='r flex justify-between w-full' disabled={!editable}>
                    <option value={`${updatedInfo.role}`}>{updatedInfo.role}</option>
                    <option value={`${roles[updatedInfo.role][1]}`}>{roles[updatedInfo.role][1]}</option>
                    <option value={`${roles[updatedInfo.role][0]}`}>{roles[updatedInfo.role][0]}</option>
                  </select>
                </div>
              }
              
              
              <div className='col-span-full mt-4 flex gap-4 '>
                {editable ? (
                  <>
                    <button 
                      className='bg-gray-300 text-lg font-semibold px-4 py-3 rounded-md flex items-center' 
                      onClick={() => navigate(staffInfo ? `/users/${staffInfo.id}` : '/profile', { replace: false })}>
                        <X className='mr-2'/> Hủy bỏ
                    </button>
                    <button 
                      className='bg-green-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center disabled:opacity-50'
                      disabled={!isChanged}
                      onClick={handleUpdateProfile}>
                        <Check className='mr-2'/> Xác nhận
                    </button>
                  </>
                )
                :
                <button 
                  className='bg-amber-500 text-white text-lg font-semibold px-4 py-3 rounded-md flex items-center'
                  onClick={() => navigate(staffInfo ? `/users/${staffInfo.id}?editable=true` : '/profile?editable=true')}><SquarePen className='mr-1'/> Chỉnh sửa</button>
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