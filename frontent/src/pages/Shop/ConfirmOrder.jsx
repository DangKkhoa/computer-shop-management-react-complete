import React, { useContext, useEffect, useState } from 'react'
import Input from '../../components/Input';
import Cart from './Cart';
import { CartContext } from '../../context/CartContext';
import { Truck, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const ConfirmOrder = () => {
  const {cart, cartQuantity, cartPrice, increaseQuantity, decreaseQuantity, removeCart} = useContext(CartContext);
  const [order, setOrders] = useState({
    name: '',
    email: '',
    phonenumber: '',
    total_quantity: 0,
    total_price: 0,
    address: '',
    payment_method: '',
    products: []
  })

  useEffect(() => {
    setOrders(prev => ({...prev, total_quantity: cartQuantity, total_price: cartPrice, products: cart}));
  }, [cart, cartQuantity, cartPrice])

  const [errorMessage, setErrorMessage] = useState('');

  const handleOrderInfoChange = (e) => {
    const { name, value } = e.target;
    setOrders(prev => ({...prev, [name]: value}));
    console.log(name + ': ' + value)
  }

  const navigate = useNavigate();

  const confirmOrderClick = async () => {
    console.log(order);
    console.log(cart)
    try {
      const res = await axios.post('http://localhost:3000/api/v1/orders', order);
      if(res.status === 201) {
        toast.success('Đặt hàng thành công', {
          position: 'top-right',
          autoClose: 2000,
          onClose: () => navigate('/my-orders')
        });
        removeCart();
      }
    }
    catch(err) {
      console.error(err);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại', {
        position: 'top-right',
        autoClose: 2000
      });
      setErrorMessage(err?.response?.data?.message || 'Lỗi.')
    }
  }
  
  
  const [paymentMethod, setPaymentMethod] = useState('')
  return (
    <div className='r'>
      <h1 className='text-3xl font-bold'>Xác nhận đơn hàng</h1>
      <div className=' flex gap-4'>
        <div className='flex-2/3 mt-6 grid grid-cols-2 gap-8 items-start'>
          <Input 
          type='text'
          label='Họ tên'
          placeholder='Nhập tên của bạn'
          id='name'
          name='name'
          inputClass='w-full outline-none p-2 ring-1 ring-gray-400 rounded-md'
          onChange={handleOrderInfoChange}/>

          <Input 
            type='email'
            label='Email'
            placeholder='Nhập email của bạn'
            id='email'
            name='email'
            inputClass='w-full outline-none p-2 ring-1 ring-gray-400 rounded-md'
            onChange={handleOrderInfoChange}/>

          <Input 
            type='text'
            label='Số điện thoại'
            placeholder='090XXXXXXX'
            id='phonenumber'
            name='phonenumber'
            inputClass='w-full outline-none p-2 ring-1 ring-gray-400 rounded-md'
            onChange={handleOrderInfoChange}/>

          <Input 
            type='text'
            label='Địa chỉ'
            placeholder='Địa chỉ nhận hàng'
            id='address'
            name='address'
            inputClass='w-full outline-none p-2 ring-1 ring-gray-400 rounded-md'
            onChange={handleOrderInfoChange}/>

          <div className='col-span-full '>
            <p className='mb-2'>Phương thức thanh toán</p>
            <div className='flex gap-x-8'>
              <label htmlFor="COD" className={`flex items-center justify-between w-64 p-4 rounded-md ${order.payment_method === 'COD' ? 'ring-2 ring-blue-500' : ' ring-1 ring-gray-300'}`}>
                <span className=''>Thanh toán khi nhận hàng (COD)</span>
                <input 
                  type="radio" 
                  id='COD' 
                  name='payment_method'
                  value='COD' 
                  checked={order.payment_method === 'COD'}
                  onChange={handleOrderInfoChange}
                  className='hidden'
                />
                <img src="/cod.png" alt="" className='inline-block w-10 ml-4' />

              </label>
              <label htmlFor="MOMO" className={`flex items-center justify-between w-64  p-4 rounded-md opacity-50 cursor-not-allowed ${order.payment_method === 'MOMO' ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300 '}`}>
                Thanh toán qua Momo (Đang phát triển)
                <input 
                  type="radio"
                  id='MOMO'
                  name='payment_method'
                  value='MOMO'
                  checked={order.payment_method === 'MOMO'}
                  onChange={handleOrderInfoChange}
                  className='hidden'
                  disabled={true}/>
                  <img src="/momo_icon.svg" alt="" className='inline-block w-10 ml-4' />
              </label>
            </div>
          </div>
          <span className='text-md text-red-500 italic'>{errorMessage}</span>
          {cart.length > 0 && <div className='col-span-full'>
            <button 
              className='flex items-center px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 '
              onClick={confirmOrderClick}>
                <Truck className='mr-2'/> Đặt hàng
            </button>
          </div>}
        </div>
        {/* <Cart /> */}
        <hr className='w-0.5 h-128 bg-gray-200 border-none'/>
        <div className='mt-6 flex-1/3'>
              {/* <h1 className='text-3xl font-bold mb-6'>Giỏ hàng của bạn</h1> */}
          <div className='max-h-96 overflow-y-auto'>
            <table className='text-md '>
              <thead>
                <tr className='border-b border-gray-300'>
                  <th className='p-4 text-left'>ID</th>
                  <th className='p-4 text-left'>Tên sản phẩm</th>
                  <th className='p-4 text-left'>Giá bán (VND)</th>
                  <th className='p-4 text-left'>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className='border-b border-gray-300'>
                    <td className='text-left p-4'>{item.id}</td>
                    <td className='text-left p-4'>{item.name}</td>
                    <td className='text-left p-4'>{item.retailed_price.toLocaleString()}</td>
                    <td className='text-left p-4 flex gap-4 items-center'>
                      <button className='text-center text-xl font-bold px-2 ' onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className='text-center text-xl font-bold px-2' onClick={() => increaseQuantity(item.id)}>+</button>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td colSpan={2} className='text-left p-4 bg-gray-300 font-semibold'>
                    Tổng
                  </td>
                  <td className='text-left p-4 font-semibold '>
                  {cartPrice.toLocaleString() || 0}
                  </td>
                  <td className='text-left p-4 font-semibold'>
                    {cartQuantity || 0}
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
          {cart.length > 0 && <div className='mt-6'>
                <button 
                  className='flex items-center float-right px-4 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600' 
                  onClick={removeCart}>
                    <Trash2 className='mr-2'/> Xóa hết
                  </button>
                {/* <Link to='/confirm-order' className='float-right block w-fit px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600' >Tiếp tục</Link> */}
              </div>
            }
        </div>
      </div>
   
      
    </div>
  )
}

export default ConfirmOrder