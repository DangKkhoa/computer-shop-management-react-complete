import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import Header from '../components/Header'
import DashboardCard from '../components/DashboardCard'
import { Boxes, HandCoins, ShoppingCart, Users } from 'lucide-react'
import { Link } from 'react-router'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const DASHBOARD = [
  {
    id: 'nhan-vien',
    title: 'Nhân viên',
    content: 100,
    icon: Users,
    path: "/users",
    color: 'bg-purple-300'
  },
  {
    id: 'tong-san-pham',
    title: 'Tổng sản phẩm',
    content: 200,
    icon: Boxes,
    path: "/inventory",
    color: 'bg-sky-300'
  },
  {
    id: 'tong-don-hang',
    title: 'Tổng đơn hàng',
    content: 150,
    icon: ShoppingCart,
    path: "/orders",
    color: 'bg-green-300'
  },
  {
    id: 'doanh-thu',
    title: 'Doanh thu',
    content: '$5000',
    icon: HandCoins,
    path: "/sale-history",
    color: 'bg-amber-300'
  },
]

// const revenueData = [
//   { month: 'Jan', revenue: 4000 },
//   { month: 'Feb', revenue: 3000 },
//   { month: 'Mar', revenue: 5000 },
//   { month: 'Apr', revenue: 7000 },
//   { month: 'May', revenue: 6000 },
//   { month: 'Jun', revenue: 8000 },
//   { month: 'Jul', revenue: 7500 },
//   { month: 'Aug', revenue: 9000 },
//   { month: 'Sep', revenue: 8500 },
//   { month: 'Oct', revenue: 9500 },
//   { month: 'Nov', revenue: 11000 },
//   { month: 'Dec', revenue: 12000 }
// ]

const topProducts = [
  { id: 1, name: 'MacBook Pro M3', unitsSold: 1200 },
  { id: 2, name: 'Dell XPS 13', unitsSold: 1100 },
  { id: 3, name: 'HP Spectre x360', unitsSold: 950 },
  { id: 4, name: 'Lenovo ThinkPad X1', unitsSold: 870 },
  { id: 5, name: 'Asus ZenBook 14', unitsSold: 850 }
]

const Dashboard = () => {
  const [quantity, setQuantity] = useState({
    'nhan-vien': 0,
    'tong-san-pham': 0,
    'tong-don-hang': 0,
    'doanh-thu': 0
  });
  const [top5Products, setTop5Products] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([
    { month: 1, revenue: 0 },
    { month: 2, revenue: 0 },
    { month: 3, revenue: 0 },
    { month: 4, revenue: 0 },
    { month: 5, revenue: 0 },
    { month: 6, revenue: 0 },
    { month: 7, revenue: 0 },
    { month: 8, revenue: 0 },
    { month: 9, revenue: 0 },
    { month: 10, revenue: 0 },
    { month: 11, revenue: 0 },
    { month: 12, revenue: 0 }
  ])
  useEffect(() => {
    document.title = "Dashboard - Admin Panel";
    
    const fetchUserQuantity = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/users/quantity', { withCredentials: true });
      if(res.status === 200) setQuantity(prev => ({...prev, 'nhan-vien': res.data.data}));
    }

    const fetchProductQuantity = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/products/quantity');
      if(res.status === 200) setQuantity(prev => ({...prev, 'tong-san-pham': res.data.data}));
    }

    const fetchPendingOrderQuantity = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/orders/quantity', { withCredentials: true });
      if(res.status === 200) setQuantity(prev => ({...prev, 'tong-don-hang': res.data.data}));
    }

    const fetchMonthlyRevenue = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/orders/monthly-revenue', { withCredentials: true });
      if(res.status === 200) {
        setMonthlyRevenue(prev => 
          prev.map(item => {
            const match = res.data.data.find(data => data.month === item.month);
            return match ? { ...item, revenue: Number(match.revenue)} : item
          })  
        );
      }
    }

    const fetchTop5Products = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/orders/top-5-products', { withCredentials: true });
      if(res.status === 200) setTop5Products(res.data.data);
    }

    fetchUserQuantity();
    fetchProductQuantity();
    fetchPendingOrderQuantity();
    fetchMonthlyRevenue();
    fetchTop5Products();
  }, [])
  return (
    <div>
      <Header title="Dashboard" />
      <main className='py-6 px-8 lg:px-10 max-w-7xl mx-auto'> 
        <motion.div 
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: .2}}
          className='max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6'>
          {DASHBOARD.map(item => (
            <Link key={item.id} to={item.path}>
              <DashboardCard 
                title={item.title}
                content={quantity[item.id]}
                icon={item.icon}
                color={item.color}
              />
            </Link>
          ))}
        </motion.div>

        {/* Revenue Chart and Top Products */}
        <motion.div 
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{delay: .4}}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className='w-full'>
            <h2 className="text-xl font-semibold mb-4">Doanh thu theo tháng</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue} margin={{left: 50}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
              

          <div className='bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl p-4 rounded-md shadow-lg'>
            <h2 className="text-xl font-semibold mb-4">Top 5 sản phảm bán chạy</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2">#</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Units Sold</th>
                </tr>
              </thead>
              {/* {top5Products.length > 0 && } */}
              <tbody>
                {top5Products.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.sold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
