import React, { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const ChangePassword = () => {
  const initial = {
    password: '',
    newPassword: '',
    confirmedPassword: ''
  }
  const [changedPassword, setChangedPassword] = useState(initial);
  const [errorMessage, setErrorMessage] = useState('');
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setChangedPassword(prev => ({...prev, [name]: value})); 
    setErrorMessage('');
    console.log(name, value);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch('http://localhost:3000/api/v1/users/change-password', changedPassword, { withCredentials: true });
      if(res.status === 200) {
        setChangedPassword(initial);
        toast.success('Đổi mật khẩu thành công', {
          autoClose: 1500,
          hideProgressBar: true
        });
      }
    }
    catch(err) {
      // console.error(err.response.data.message);
      setErrorMessage(err?.response?.data?.message || 'Có lỗi khi đổi mật khẩu. Vui lòng thử lại');
    }
  }

  return (
    <>
      <Header title="Đổi mật khẩu"/>
      <main className='mt-6 p-20 w-full flex justify-center '>
        <form action="" className='mt-20 w-1/2 flex flex-col gap-4' onSubmit={handleChangePassword}>
          <Input 
            type='password'
            label='Mật khẩu hiện tại'
            placeholder='Nhập mật khẩu hiện tại của bạn...'
            name='password'
            id='password'
            value={changedPassword.password}
            labelClass='text-lg'
            inputClass='ring-1 ring-gray-400 p-2 w-full rounded-md'
            onChange={handlePasswordChange}/>
          
          <Input 
            type='password'
            label='Mật khẩu mới'
            placeholder='Nhập mật khẩu mới...'
            name='newPassword'
            id='newPassword'
            value={changedPassword.newPassword}
            labelClass='text-lg'
            inputClass='ring-1 ring-gray-400 p-2 w-full rounded-md'
            onChange={handlePasswordChange}/>
          
          <Input 
            type='password'
            label='Xác nhận mật khẩu'
            placeholder='Nhập mật khẩu mới một lần nữa...'
            name='confirmedPassword'
            id='confirmedPassword'
            value={changedPassword.confirmedPassword}
            labelClass='text-lg'
            inputClass='ring-1 ring-gray-400 p-2 w-full rounded-md'
            onChange={handlePasswordChange}/>
            {errorMessage && <span className='text-red-500 italic'>{errorMessage}</span>}
            <button className='px-4 py-2 w-fit rounded-md bg-blue-500 hover:bg-blue-600 text-white text-lg'>Thay đổi</button>
        </form>
      </main>
      <ToastContainer />
    </>
  )
}

export default ChangePassword