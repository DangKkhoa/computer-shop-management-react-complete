import { Home, Laptop, MonitorSmartphone, Headphones, ShoppingCart, Boxes, LogIn, BookOpen } from 'lucide-react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { CartContext } from '../../context/CartContext'


const LEFT_MENU = [
  {path: "/", name: "Trang chủ", icon: Home},
  {path: "/products/laptop", name: "Laptop", icon: Laptop},
  {path: "/products/pc", name: "PC", icon: MonitorSmartphone},
  {path: "/products/accessories", name: "Phụ Kiện - Gaming Gear", icon: Headphones},
]

const RIGHT_MENU = [
  {path: "/about", name: "Về chúng tôi", icon: BookOpen},
  {path: "/my-orders", name: "Đơn hàng", icon: Boxes},
  {path: "/cart", name: "Giỏ hàng", icon: ShoppingCart},
  {path: "/login", name: "Đăng nhập", icon: LogIn},
  // {path: "/regster", name: "Đăhg ký", icon: ''},
]

const ShopHeader = () => {

  const { cartQuantity } = useContext(CartContext);

  return (
    <header className='fixed top-0 z-100 h-20 backdrop-blur-lg bg-[rgba(255,255,255,0.4)]  shadow-sm w-full flex justify-between p-4 border-b border-gray-300'>
        <div className='flex gap-8 items-center'>
          <a className='text-2xl italic font-bold text-nowrap' href='/'>NHÓM 7</a>
          <nav className='flex gap-4'>
            {LEFT_MENU.map(item => (
              <NavLink to={item.path} className={({isActive}) => 'p-2 ' + (isActive  ? 'shadow-[inset_0_-3px_0_0_rgba(0,0,0,1)]' : '')}>
              
              <span className='flex items-center font-semibold text-nowrap'>{<item.icon size={20} className='mr-1'/>} {item.name}</span>
            </NavLink>
            ))}
          </nav>
          
          
        </div>
        {/* <nav className='flex gap-8 items-center'>
          {RIGHT_MENU.map(item => (
            <NavLink to={item.path} className={'p-2 shadow-[inset_0_-2px_0_0_rgba(0,0,0,1)]'}>
            
            <span className='flex items-center font-semibold'>{<item.icon size={20} className='mr-1'/>} {item.name}</span>
          </NavLink>
          ))}
        </nav> */}

        <nav className='flex gap-4 items-center'>
          {/* {RIGHT_MENU.map(item => (
            <NavLink to={item.path}>
              <span className='flex items-center font-semibold text-nowrap'>{item.icon && <item.icon className='mr-2'/>}{item.name}</span>
            </NavLink>
          ))} */}

          <NavLink to='/about'>
            <span className='flex items-center font-semibold text-nowrap'><BookOpen className='mr-2'/> Về chúng tôi</span>
          </NavLink>
          <NavLink to='/my-orders'>
            <span className='flex items-center font-semibold text-nowrap'><Boxes className='mr-2'/> Đơn hàng</span>
          </NavLink>
          <NavLink to='/cart' className='relative'>
            <span className='flex items-center font-semibold text-nowrap'><ShoppingCart className='mr-2'/> Giỏ hàng</span>
            {cartQuantity > 0 && <span className='absolute bottom-3 left-3 w-5 h-5 px-1 flex items-center justify-center  bg-red-500 text-white text-[12px] rounded-full'>{cartQuantity}</span>}
          </NavLink>
          <NavLink to='/login'>
            <span className='flex items-center font-semibold text-nowrap'><LogIn className='mr-2'/> Đăng nhập</span>
          </NavLink>
        </nav>

      </header>
  )
}

export default ShopHeader