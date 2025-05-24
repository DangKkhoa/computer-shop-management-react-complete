import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router'

import Login from './pages/Login'
// import Home from './pages/Home'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Sidebar from './components/Sidebar'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Users from './pages/Users'
import SaleHistory from './pages/SaleHistory'
import Shop from './pages/Shop/Shop'
import RoleRoute from './route/RoleRoute'
import Unauthorized from './pages/Unauthorized'
import { AuthContext, AuthProvider } from './context/AuthContext'
import AddProduct from './pages/AddProduct'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import ShopLayout from './layouts/ShopLayout'
import { CartProvider } from './context/CartContext'
import ProductsByCategory from './pages/Shop/ProductsByCategory'
import Cart from './pages/Shop/Cart'
import ConfirmOrder from './pages/Shop/ConfirmOrder'
import SearchProductPage from './pages/Shop/SearchProductPage'
import OrderDetail from './pages/OrderDetail'
import ShopProdctDetail from './pages/Shop/ShopProdctDetail'
import ProductDetailManagement from './pages/ProductDetailManagement'
import UserProfile from './pages/UserProfile'
import SaleHistoryDetail from './pages/SaleHistoryDetail'
import SearchOrder from './pages/SearchOrder'
import AddEmployee from './pages/AddEmployee'
import ChangePassword from './pages/ChangePassword'
import ShopOrders from './pages/Shop/ShopOrders'
// import NotFound from './pages/NotFound'


const App = () => {

  const location = useLocation();

  return (
    
    <div className='relative min-h-screen inset-0 bg-gradient-to-br from-sky-100  via-white to-sky-100'>
      <Routes location={location} key={location.pathname}>
        <Route element={<CartProvider><ShopLayout /></CartProvider>}>
          <Route path='/' element={<Shop />} />
          <Route path='/my-orders/:id' element={<ShopOrders />}/>
          <Route path='/search' element={<SearchProductPage />} />
          <Route path='/cart' element={<ConfirmOrder />} />
          <Route path='/confirm-order' element={<ConfirmOrder />} />
          <Route path='/products/:category/:id' element={<ShopProdctDetail />} />
          <Route path='/products/:category' element={<ProductsByCategory />} />
        </Route>
       
        <Route path="/customer/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/unauthorized' element={<Unauthorized />}/>
        
        <Route path='/user/login' element={<AuthProvider><Login /></AuthProvider>}/>
        <Route element={<AuthProvider><MainLayout /></AuthProvider>}>
          {/* <Route path='/user/login' element={<Login />}></Route> */}
          <Route path='/dashboard' element={<RoleRoute allowRoles={["ADMIN"]}><Dashboard /></RoleRoute>}/>
          <Route 
            path='/orders' 
            element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON", "ACCOUNTANT"]}><Orders /></RoleRoute>}>
          </Route>
          <Route path='/orders/search' element={<SearchOrder route='orders'/>}/>
          <Route path='/orders/:id' element={<OrderDetail />} />

          <Route 
            path='/inventory' 
            element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}><Inventory /></RoleRoute>}>
              {/* <Route path='add' element={<AddProduct />}/> */}
              <Route path=":id" element={<ProductDetailManagement />} />
          </Route>
          <Route path='/inventory/add' element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}><AddProduct /></RoleRoute>}/>
          <Route path='/users' element={<RoleRoute allowRoles={["ADMIN"]}><Users /></RoleRoute>}/>
          <Route path='/users/:id' element={<RoleRoute allowRoles={["ADMIN"]}><UserProfile /></RoleRoute>} />
          <Route path='/customers' element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}><Customers /></RoleRoute>}/>
          <Route 
            path='/sale-history'
            element={<RoleRoute allowRoles={["ADMIN", "ACCOUNTANT"]}><SaleHistory /></RoleRoute>}>
              
            </Route>
            <Route path='/sale-history/search' element={<RoleRoute allowRoles={["ADMIN", "ACCOUNTANT"]}><SearchOrder route='sale-history'/></RoleRoute>}/>
            <Route path='/sale-history/:id' element={<RoleRoute allowRoles={["ADMIN", "ACCOUNTANT"]}><SaleHistoryDetail route='sale-history'/></RoleRoute>}/>

          <Route path='/profile' element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON", "ACCOUNTANT"]}><Profile /></RoleRoute>} />
          <Route path='/change-password' element={<RoleRoute allowRoles={["ADMIN", "SALESPERSON", "ACCOUNTANT"]}><ChangePassword /></RoleRoute>}/>
          
        </Route>
      </Routes>
      <ToastContainer /> 
    </div>
    
  )
}

export default App