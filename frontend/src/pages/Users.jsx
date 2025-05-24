import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Header from '../components/Header'
import UserCard from '../components/UserCard'
import Search from '../components/Search'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router'
import AddEmployee from './AddEmployee'
import { toast } from 'react-toastify'

const Users = () => {
  useEffect(() => {
    document.title = "Nhân viên";
  }, [])

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState({id: null, name: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [addUserOpened, setAddUserOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const initialUser = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    gender: '',
    role: ''
  }
  const [newUser, setNewUser] = useState(initialUser)

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/users', {
          withCredentials: true
        });
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); 
  }, [])

  const handleDeleteUser = (id, name) => {
    setSelectedUser({id, name});
    setIsModalOpen(true);
  }

  const handleNewUserInfoChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({...prev, [name]: value}));
    console.log(name, value);
  }
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/add', newUser, { withCredentials: true });
      if(res.status === 201) {
        setErrorMessage('');
        setNewUser(initialUser);

        toast.success("Thêm nhân viên thành công", {
          autoClose: 1000,
          hideProgressBar: true,
          onClose: () => window.location.reload()
        });
      }
    }
    catch(err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || 'Có lỗi khi thêm nhân viên');
    }
  }

  const handleConfirmDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/users/${selectedUser.id}`, {
        withCredentials: true
      });
      console.log(res.data);
      if(res.status === 200) {
        const updatedUsers = users.filter(user => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers)
        toast.success('Xóa nhân viên thành công', {
          autoClose: 2000,
          hideProgressBar: true
        })
      }
      else {
        alert('Something went wrong while deleting the user');
      }
    }
    catch(err) {
      console.error(err);
      alert('Something went wrong while deleting the user');
    }
    setIsModalOpen(false);
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  }

  const lockUser = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/users/${id}/lock`, {
        is_locked: 1
      }, { withCredentials: true });

      if(res.status === 200) {
        alert('Khóa thành công');
        window.location.reload();
      }
    }
    catch(err) {
      console.error(err);
      alert("Có lỗi khi khóa user");
    }
  }

  const unLockUser = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/users/${id}/unlock`, {
        is_locked: 0
      }, { withCredentials: true });

      if(res.status === 200) {
        alert('Đã mở khóa');
        window.location.reload();
      }
    }
    catch(err) {
      console.error(err);
      alert("Có lỗi xảy ra khi mở khóa");
    }
  }

  return (
    <div>
      <Header title="Nhân Viên" />
      <main className='mt-6 p-6 w-full'>
        <div className='mb-6 flex items-center gap-4'>
          <Search 
            placeholder="Search users by name or ID"
            data={users}
            setData={setFilteredUsers}
          />
          <Button 
            icon={<UserPlus />}
            className={"text-blue-500"}
            tooltip={"Add User"}
            onClick={() => setAddUserOpened(true)}
          />
        </div>
        <div className='flex justify-between gap-4'>
          <div className='flex-2/3 flex  flex-wrap  gap-4 '>
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id}
                id={user.id}
                name={user.firstname + ' ' + user.lastname}
                image={user.image}
                role={user.role}
                email={user.email}
                isLocked={user.is_locked}
                deleteUser={handleDeleteUser}
                lockUser={() => lockUser(user.id)}
                unLockUser={() => unLockUser(user.id)}/>
            ))}
          </div>
        
          {addUserOpened && <div className='flex-1/2 h-fit shadow-xl rounded-lg'>
              <AddEmployee 
                handleNewUserInfoChange={handleNewUserInfoChange} 
                newUser={newUser}
                handleAddEmployee={handleAddEmployee}
                setAddEmployeeOpened={setAddUserOpened}
                error={errorMessage}/>
            </div>
          }
        </div>


        {isModalOpen && (
          <Modal 
            isOpen={isModalOpen}
            title="Delete User"
            message={`Xóa ${selectedUser.name} khỏi hệ thống ?`}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}


      </main>
    </div>
  )
}

export default Users