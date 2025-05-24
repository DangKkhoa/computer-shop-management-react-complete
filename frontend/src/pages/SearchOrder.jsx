import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link, Outlet, useParams, useSearchParams } from 'react-router';


const SearchOrder = ({route}) => {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();
  const q = searchParams.get('q');

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    document.title = `Tìm kiếm: ${q}`;
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/${route}/search?q=${q}`, { withCredentials: true });
        if(res.status === 200) {
          console.log(q);
          console.log(res.data.data);
          setOrders(res.data.data); 
        }
      }
      catch(err) {
        console.error(err.message);
        alert('Có lỗi khi lấy đơn hàng');
      }
    }

    fetchOrder();
  }, [])

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/orders/${id}/status`, {newStatus}, { withCredentials: true});
      if(res.status === 200) {
        if(newStatus === 'CONFIRMED') {
          toast.success('Xác nhận đơn hàng thành công', {
            position: 'top-right',
            hideProgressBar: true,
            autoClose: 2000
          })
        }
        else {
          toast.success('Hủy đơn thành công', {
            position: 'top-right',
            hideProgressBar: true,
            autoClose: 2000
          })
        }
        setOrders(prev => prev.filter(order => order.id != id));
        // setOrders(prev => prev.map(prevOrder => 
        //   prevOrder.id === id ? {...prevOrder, status: newStatus} : prevOrder
        // ))
      }
    }
    catch(err) {
      console.error(err.message);
      toast.error('Có lỗi khi cập nhật trạng thái đơn hàng', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true
      })
    }
  }
  return (
    <>
      <>
        <Header title={`Tìm kiếm: ${q}`}/>
        <main className='mt-6 p-6 w-full'>
          <div className='w-full overflow-auto'>
            <form action={`/${route}/search`} className='pl-2 mt-2'>
              <input 
                type="text" 
                placeholder='Nhập id đơn hàng...'
                className='w-96 mr-2 p-2 outline-none ring-1 ring-gray-300 shadow-sm focus:shadow-lg rounded-md'/>
              
              <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md'>TÌm</button>
            </form>
            <table className='w-full text-nowrap min-w-96'>
              <thead>
                <tr>
                  <th className='border-b border-gray-300 group text-left p-4'>ID</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Số lượng</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Tổng giá</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Số điện thoại đặt hàng</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Ngày đặt hàng</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Trạng thái</th>
                  <th className='border-b border-gray-300 group text-left p-4'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map(order => (
                  <tr key={order.id} className='group hover:bg-gray-100 '>
                    <td className='border-b border-gray-300 p-4'>
                      <Link to={`/orders/${order.id}`} className='hover:text-blue-500 hover:font-semibold'>{order.id}</Link>
                    </td>
                    <td className='border-b border-gray-300 p-4'>{order.total_quantity}</td>
                    <td className='border-b border-gray-300 p-4'>{order.total_price?.toLocaleString()}</td>
                    <td className='border-b border-gray-300 p-4'>{order.customer_phone}</td>
                    <td className='border-b border-gray-300 p-4'>{new Date(order?.created_at)?.toLocaleString()}</td>
                    <td className='border-b border-gray-300 p-4'>
                      <span 
                        className={`
                          p-2 rounded-md font-semibold ${order.status === 'PENDING' ? 
                          'bg-amber-500 text-amber-100' : order.status === 'CANCELLED' ? 
                          'bg-red-500 text-red-100' : 'bg-green-500 text-green-100'}
                        `}>
                        {order.status}
                      </span>
                    </td>
                    <td className='border-b border-gray-300 py-4'>
                      {order.status === 'PENDING' && <>
                        <button 
                          className='px-3 py-2 bg-green-500 mr-2 text-green-100 hover:bg-green-600 rounded-md'
                          onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}>
                            <Check size={20}/>
                        </button>
                        <button 
                          className='px-3 py-2 bg-red-500 text-red-100 hover:bg-red-600 rounded-md'
                          onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>
                            <X size={20}/>
                        </button>
                      </>}

                      {order.status === 'CONFIRMED' && <>
                        <button 
                          className='px-3 py-2 bg-red-500 text-red-100 hover:bg-red-600 rounded-md'
                          onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>
                            <X size={20}/>
                        </button>
                      </>}
                    </td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan={6} className='text-gray-400 text-lg p-10 text-center'>Chưa có đơn hàng nào</td>
                </tr>
                } 
              </tbody>
            </table>
          </div>
        </main>
      </> 
      
    </>
  )
}

export default SearchOrder