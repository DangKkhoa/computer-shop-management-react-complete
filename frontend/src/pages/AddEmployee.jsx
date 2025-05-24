import React, { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import axios from 'axios'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'

const AddEmployee = ({handleNewUserInfoChange, newUser, handleAddEmployee, error, setAddEmployeeOpened}) => {
  // const [newUser, setNewUser] = useState({
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   phonenumber: '',
  //   gender: '',
  //   role: ''
  // })

  // const  = (e) => {
  //   const { name, value } = e.target;
  //   setNewUser(prev => ({...prev, [name]: value}));
  //   console.log(name, value);
  // }

  
  return (
    <div className='px-4 py-2'>
      <button className='float-right' onClick={() => setAddEmployeeOpened(false)}><X  /></button>
      <h1 className='text-2xl font-bold'>Thêm nhân viên</h1>
      <form action="" className='grid grid-cols-2 gap-4' onSubmit={handleAddEmployee}>
        <Input 
        label='Họ'
        name='firstname'
        id='firstname'
        placeholder='Trần Văn'
        value={newUser.firstname}
        labelClass='text-lg font-semibold'
        inputClass='w-full ring-1 ring-gray-300 rounded-md p-2'
        onChange={handleNewUserInfoChange}
        />

        <Input 
          label='Tên'
          name='lastname'
          id='lastname'
          placeholder='A'
          value={newUser.lastname}
          labelClass='text-lg font-semibold'
          inputClass='w-full ring-1 ring-gray-300 rounded-md p-2'
          onChange={handleNewUserInfoChange}
        />
        
        <div className='col-span-full'>
          <Input 
            label='Email'
            name='email'
            id='email'
            placeholder='example@email.com'
            value={newUser.email}
            labelClass='text-lg font-semibold'
            inputClass='w-full ring-1 ring-gray-300 rounded-md p-2' 
            onChange={handleNewUserInfoChange}
          />
        </div>
        <div className='col-span-full'>
          <Input 
            label='Số điện thoại'
            name='phonenumber'
            id='phonenumber'
            placeholder='090XXXXXXX'
            value={newUser.phonenumber}
            labelClass='text-lg font-semibold'
            inputClass='w-full ring-1 ring-gray-300 rounded-md p-2' 
            onChange={handleNewUserInfoChange}/>
        </div>

        <div className='w-full'>
          <label htmlFor="gender" className='block text-xl font-semibold mb-2'>Giới tính</label>
          <select name="gender" id="gender" className='w-full' onChange={handleNewUserInfoChange}>
            <option value="">Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>
        </div>

        <div className='w-full'>
          <label htmlFor="role" className='block text-xl font-semibold mb-2'>Vị trí</label>
          <select name="role" id="role" className='w-full' onChange={handleNewUserInfoChange}>
            <option value="">Chọn vị trí</option>
            <option value="ADMIN">Admin</option>
            <option value="SALESPERSON">Saleperson</option>
            <option value="ACCOUNTANT">Accountant</option>            
          </select>
        </div>
        <div className='col-span-full text-red-500 italic'>{error}</div>
        <button className='w-fit px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md'>Xác nhận</button>
      </form>
    </div>
  )
}

export default AddEmployee