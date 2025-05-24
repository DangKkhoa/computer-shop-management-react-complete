import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from './Header';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FileText } from 'lucide-react';
import ShopHeader from './Shop/ShopHeader';

const DisplayOrderDetail = ({user, id, order, setOrder, updatedOrder, statusColor, setUpdatedOrder}) => {
  // const { id } = useParams();
  // const [order, setOrder] = useState();
  // const statusColor = {
  //   'PENDING': 'text-amber-500',
  //   'CONFIRMED': 'text-green-500',
  //   'CANCELLED': 'text-red-500'
  // }

  // const [updatedOrder, setUpdatedOrder] = useState();
  const isEdited = JSON.stringify(updatedOrder) != JSON.stringify(order);
  // useEffect(() => {
  //   document.title = `Đơn hàng #${id}`;
  //   const fetchOrderDetail = async (id) => {
  //     const res = await axios.get(`http://localhost:3000/api/v1/orders/${id}`, { withCredentials: true });
  //     if(res.status === 200) {
  //       setOrder(res.data.data);
  //       setUpdatedOrder(res.data.data);
  //       console.log(res.data.data);
  //     }
  //   }

  //   fetchOrderDetail(id);
  // }, [])

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    // console.log(name + ": " + value.length)
    
    
    setUpdatedOrder(prev => ({...prev, [name]: value}));
    
  }

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/v1/orders/${id}/status`, {newStatus}, { withCredentials: true});
        if(res.status === 200) {
          setOrder(prev => ({...prev, status: newStatus}));
          toast.success('Cập nhật trạng thái thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true
          })
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
      {order ? <>
        {user && <Header title={`Đơn hàng`}/>}
        <main className='mt-6 p-6 w-full md:px-10 lg:px-20 flex flex-col items-center'>
          {order && <>
            <h2 className='text-3xl font-semibold flex items-center'><FileText size={28} className='mr-2'/>${order.id}</h2>
            <div className='w-full grid grid-cols-2'>
              <div className='p-10'>
                <p className='py-2'>
                  <b>Tên khách hàng</b>: 
                  <input 
                    className='ml-2 p-2 bg-gray-200 outline-none focus:bg-gray-300'
                    type="text"
                    name='customer_name'
                    value={updatedOrder.customer_name}
                    onChange={handleValueChange}
                    disabled={!user}/>
                </p>
                <p className='py-2'>
                  <b>Số điện thoại</b>: 
                  <input 
                    className='ml-2 p-2 bg-gray-200 outline-none focus:bg-gray-300'
                    type="text"
                    name='customer_phone'
                    value={updatedOrder.customer_phone}
                    onChange={handleValueChange}
                    disabled={!user}/>
                </p>
                <p className='py-2'>
                  <b>Địa chỉ giao hàng</b>: 
                  <input 
                    className='ml-2 p-2 bg-gray-200 outline-none focus:bg-gray-300'
                    type="text"
                    name='address'
                    value={updatedOrder.address}
                    onChange={handleValueChange}
                    disabled={!user}/>
                </p>
                
              </div>
              <div className='p-10 flex flex-col items-end'>
                <p className='py-2 text-right flex '>
                  <b>Phương thức thanh toán</b>: 
                  <img src={`${order.payment_method === 'COD' ? '/cod.png': '/momo_icon.svg'}`} className='w-6 ml-2' alt="" />
                  {/* <span>{order.payment_method}</span> */}
                </p>
                <p className='py-2 text-right'><b>Xác nhận bởi</b>: <span>{updatedOrder.salesperson_name}</span></p>
                <p className='py-2 text-right'>
                  <b>Trạng thái</b>: 
                  <span 
                    className={`ml-2 font-semibold ${statusColor[order.status]}`}>
                      {order.status}
                  </span>
                </p>
              </div>
              
            </div>
            <div className='w-full px-20 overflow-auto max-h-[500px]'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='p-4 text-left'>Tên sản phẩm</th>
                    <th className='p-4 text-left'>Giá bán (VND)</th>
                    <th className='p-4 text-left'>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {order.details.map((detail, index) => (
                    <tr key={index}>
                      <td className='p-4'>{detail.name}</td>
                      <td className='p-4'>{detail.price.toLocaleString()}</td>
                      <td className='p-4'>{detail.quantity}</td>
                    </tr>
                  ))}
                  <tr className='bg-gray-300'>
                    <td className='p-4'><b>Tổng</b></td>
                    <td className='p-4'>{order.total_price.toLocaleString()}</td>
                    <td className='p-4'>{order.total_quantity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {user && <div className='w-full px-20 mt-4 gap-4'>
              {order.status === 'PENDING' && <button 
                className={`py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600  ${!isEdited ? 'opacity-50 pointer-events-none' : ''}`}
                disabled={!isEdited}
                >
                  Cập nhật
              </button>} 
              <div className='float-right '>
                {order.status === 'PENDING' && <>
                  <button 
                    className='mr-4 py-3 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600'
                    onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}>
                      Xác nhận
                  </button>
                  <button 
                    className='py-3 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600'
                    onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>
                      Hủy đơn
                  </button>
                </>}
              </div>
              

              {order.status === 'CONFIRMED' && <>
                <button 
                  className='float-right py-3 px-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600'
                  onClick={() => updateOrderStatus(order.id, 'CANCELLED')}>
                    Hủy đơn
                </button>
              </>}
            </div>}
            
            
          </>}
        </main>
        </> 
        : 
        <>
          {user && <div className='w-full text-center py-10 text-gray-500'>
            <span>Không có thông tin đơn hàng. Vui lòng kiểm tra trong </span> 
            <a href="/sale-history" className='text-blue-500 underline'><span>Lịch sử đơn hàng</span></a>
          </div>}
          
        </>
      }
      
    </>
  )
}

export default DisplayOrderDetail