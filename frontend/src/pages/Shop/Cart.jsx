import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { tr } from 'motion/react-client';
import { Link } from 'react-router';

const Cart = () => {
  const { cart, cartQuantity, cartPrice, increaseQuantity, decreaseQuantity, removeCart } = useContext(CartContext);

  console.log(cart);

  return (
    <div className='mt-6 grow-3'>
      {/* <h1 className='text-3xl font-bold mb-6'>Giỏ hàng của bạn</h1> */}
      <div className=''>
        <table className='text-md'>
          <thead>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>Tên sản phẩm</th>
              <th className='p-4 text-left'>Giá bán (VND)</th>
              <th className='p-4 text-left'>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
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
              <td className='text-left p-4 font-semibold'>
              {cartPrice.toLocaleString() || 0}
              </td>
              <td className='text-left p-4 font-semibold'>
                {cartQuantity || 0}
              </td>
            </tr>
          </tbody>
        </table>
        {cart.length > 0 && <div className='mt-6'>
            <button className='float-right px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600' onClick={removeCart}>Xóa hết</button>
            {/* <Link to='/confirm-order' className='float-right block w-fit px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600' >Tiếp tục</Link> */}
          </div>
        }
      </div>
    </div>
  )
}

export default Cart