import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import { ChevronLeft, ChevronRight, Eye, PackagePlus, Trash } from 'lucide-react'
import Search from '../components/Search'
import Button from '../components/Button'
import Modal from '../components/Modal'
import axios from 'axios'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'


const Inventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "Inventory" ;
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/products', {
          withCredentials: true
        })

        if(res.status === 200) {
          console.log(res.data);
          setProducts(res.data.data);
        }
      }
      catch(err) {
        console.error(err);
        alert("Error fetching products");
      }
    }
    fetchProducts();
  }, [])

  useEffect(() => {
    setFilteredProducts(products);
  }, [products])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const [prompt, setPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  
  const searchProducts = (e) => {
    const term = e.target.value.toLowerCase();
    
    console.log(term);
    
    const searchResults =products.filter(product => product.name.toLowerCase().includes(term));
    setFilteredProducts(searchResults);
  }

  const submitPrompt = () => {
    axios.post('http://localhost:3000/api/v1/ai/products', { prompt }, { withCredentials: true })
  }

  const handleDeleteProduct = (id, name) => {
    setSelectedProduct({id, name});
    setIsModalOpen(true);
  }

  const handleConfirmDelete = async () => {

    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/products/${selectedProduct.id}`, {
        withCredentials: true
      });
      console.log(res.data);
      if(res.status === 200) {
        const updatedProducts = products.filter(p => p.id !== selectedProduct.id);
        setFilteredProducts(updatedProducts);
        toast.success('Xóa sản phẩm thành công', {
          hideProgressBar: true,
          autoClose: 2000
        });
      }
      else {
        toast.success('Có lỗi khi xóa sản phẩm. Vui lòng thử lại sau', {
          hideProgressBar: true,
          autoClose: 2000
        });
      }
    }
    catch(err) {
      console.error(err);
      toast.success('Có lỗi khi xóa sản phẩm. Vui lòng thử lại sau', {
          hideProgressBar: true,
          autoClose: 2000
        });
    }
    setIsModalOpen(false);
    
  }
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Header title="Quản lí kho"/>

      {id ? <Outlet /> : 
        <main className='mt-6 p-6 w-full'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-4'>
              <Search 
                placeholder="Nhập tên / id sản phẩm"
                data={products}
                setData={setFilteredProducts}
              />
              {/* <button className='text-blue-500'><PackagePlus /></button> */}
              <Button 
                icon={<PackagePlus />}
                className={"text-blue-500"}
                tooltip={"Add Product"}
                onClick={() => navigate('/inventory/add')}
              />
              <div>
                <input 
                  type="text" 
                  placeholder='Điển prompt...'
                  value={prompt}
                  onChange={() => setPrompt(e.target.value)}
                  className='ring-1 ring-gray-300 p-2 w-96 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                />
                <button onClick={submitPrompt}>TÌm</button>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                className={`px-4 py-2 ${currentPage === 1 ? "text-blue-200 pointer-events-none" : "text-blue-500 hover:text-blue-700"}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <ChevronLeft />
              </button>
              <span className='mx-4'>Page {currentPage} of {totalPages}</span>
              <button 
                className={` px-4 py-2 ${currentPage === totalPages ? "text-blue-200 pointer-events-none" : "text-blue-500 hover:text-blue-700"}`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <ChevronRight />
                
              </button>
              
            </div>
              
          </div>
          <div className='w-full overflow-auto'>
            <table className='w-full text-nowrap min-w-96'>
              <thead>
                <tr>
                  <th className='border-b border-gray-300 group text-left py-4'>Tên sàn phẩm</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Số lượng</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Giá bán</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Trạng thái</th>
                  <th className='border-b border-gray-300 group text-left py-4'>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map(product => (
                  <tr key={product.id} className='group hover:shadow-[0px_-1px_10px_rgba(0,0,0,0.25)] transition-all duration-300'>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.name}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.quantity}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>{product.retailed_price.toLocaleString()}</td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-none'>
                      <span className={`p-2 ${product.quantity > 0 ? "bg-gradient-to-bl from-green-200 to-white text-green-600" : "bg-gradient-to-br from-red-200 to-white text-red-600"}`}>{product.quantity > 0 ? "Còn hàng" : "Hết hàng"}</span>
                    </td>
                    <td className='border-b border-gray-300 py-4 group-hover:border-0 flex items-center'>
                      <a href={`/inventory/${product.id}`} className='text-blue-500  hover:text-blue-600 transition-all duration-200 hover:scale-110'><Eye /></a>
                      <button 
                        className='text-red-500 hover:text-red-600 ml-2 transition-all duration-200 hover:scale-110'
                        onClick={() => handleDeleteProduct(product.id, product.name)}>
                          <Trash />
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <Modal 
              isOpen={isModalOpen}
              title="Xóa sản phẩm"
              message={`Xóa sản phẩm ${selectedProduct.name} ra khỏi hệ thống ?`}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <ToastContainer />
        </main>
      }
    </div>
  )
}

export default Inventory