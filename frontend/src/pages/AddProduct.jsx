import React, { useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    imported_price: '',
    retailed_price: '',
    quantity: 10,
    category: '',
    manufacturer: '',
    cpu: '',
    ram: '',
    storage: '',
    screen: '',
    gpu: '',
    description: ''
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
    console.log(name + ": " + value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/products/add', 
        newProduct, 
        { withCredentials: true }
      );

      if(res.status === 201) {
        // alert('Product added successfully');
        toast.success("Thêm sản phẩm thành công", {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true,
          // transition: Bounce,
        })
        // setNewProduct(null);
        setTimeout(() => navigate("/inventory"), 2000);
      }
    }
    catch(err) {
      console.error(err.response?.data?.message);
      toast.error(err.response?.data?.message, {
        hideProgressBar: true,
        autoClose: 2000,
        position: 'top-right'

      });
    }

  }
  return (
    <div>
      <Header title="Add Product"/>
      <main className='my-6 px-6 pt-6 pb-10 w-full'>
        <form className='w-full' onSubmit={handleFormSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4'>
            <div>
              <Input 
                type="text"
                placeholder="VD: ANV15-51-58AN"
                label="ID sản phẩm"
                id="id"
                name="id"
                value={newProduct.id}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}

              />
            </div>
            <div>
              <Input 
                type="text"
                placeholder="VD: Laptop Gaming Acer Nitro V"
                label="Tên sản phẩm"
                id="name"
                name="name"
                value={newProduct.name}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input 
                type="text"
                placeholder="VD: 15690000"
                label="Giá nhập"
                id="imported_price"
                name="imported_price"
                value={newProduct.imported_price}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Input 
                type="text"
                placeholder="VD: 17690000"
                label="Giá bán"
                id="retailed_price"
                name="retailed_price"
                value={newProduct.retailed_price}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input 
                type="number"
                placeholder=""
                label="Số lượng"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}
              />
            </div>
            <div className='grid grid-cols-2 gap-x-4'>
              <div>
                <label htmlFor="category" className='block mb-1 text-lg font-semibold'>Loại sản phẩm</label>
                <select 
                  name="category" 
                  id="category"
                  value={newProduct.category}
                  onChange={handleInputChange} 
                  className='w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-0'>
                    <option value="">Chọn loại</option>
                    <option value="Laptop/Office/Văn Phòng">Laptop văn phòng</option>
                    <option value="PC/Desktop">PC / Máy tình bàn</option>
                    <option value="Laptop/Gaming">Laptop gaming</option>
                    <option value="Laptop/Macbook">Macbook</option>
                    <option value="Laptop/Old/Cũ">Laptop cũ</option>
                    <option value="Accessories/Phụ kiện">Phụ kiện</option>
                </select>
              </div>
              <div>
                <label htmlFor="manufacturer" className='block mb-1 text-lg font-semibold'>Nhà sản xuất</label>
                <select 
                  name="manufacturer" 
                  id="manufacturer"
                  value={newProduct.manufacturer}
                  onChange={handleInputChange} 
                  className='w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-0'>
                  <option value="">Chọn nsx</option>
                  <option value="Apple">Apple</option>
                  <option value="Asus">ASUS</option>
                  <option value="HP">HP</option>
                  <option value="Acer">Acer</option>
                  <option value="Dell">DELL</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="MSI">MSI</option>
                </select>
              </div>
            </div>
            <div className='col-span-full'>
              <Input 
                type="text"
                placeholder="VD: Intel Core i5-13420H (8 lõi / 12 luồng, up to 4.60 GHz, 12 MB Intel Smart Cache)"
                label="CPU"
                id="cpu"
                name="cpu"
                value={newProduct.cpu}
                labelClass='text-lg font-semibold'
                inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                onChange={handleInputChange}
              />
            </div>  
            <div className='col-span-full'>
                <Input 
                  type="text"
                  placeholder='VD: 15.6" FHD 144Hz'
                  label="Màn hình"
                  id="screen"
                  name="screen"
                  value={newProduct.screen}
                  labelClass='text-lg font-semibold'
                  inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                  onChange={handleInputChange}
                />
              </div>
            <div className='col-span-full grid grid-cols-3 gap-x-4'>
              <div className='col-span-1 grid grid-cols-2'>
                <div>
                <label htmlFor="ram" className='block mb-1 text-lg font-semibold'>RAM</label>
                <select 
                  name="ram" 
                  id="ram"
                  value={newProduct.ram}
                  onChange={handleInputChange} 
                  className='border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-0'>
                    <option value="">Chọn RAM</option>
                    <option value="4GB">4GB</option>
                    <option value="8GB">8GB</option>
                    <option value="12GB">12GB</option>
                    <option value="16GB">16GB</option>
                    <option value="24GB">24GB</option>
                    <option value="32GB">32GB</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                </select>
                </div>
                <div>
                  <label htmlFor="storage" className='block mb-1 text-lg font-semibold'>Ổ cứng</label>
                  <select 
                    name="storage" 
                    id="storage"
                    value={newProduct.storage} 
                    onChange={handleInputChange}
                    className='border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-sky-300 rounded-0'>
                      <option value="">Chọn SSD</option>
                      <option value="128GB">128GB</option>
                      <option value="256GB">256GB</option>
                      <option value="512GB">512GB</option>
                      <option value="1TB">1TB</option>
                      <option value="2TB">2TB</option>
                      <option value="4TB">4TB</option>
                  </select>
                </div>
              </div>
              <div className='col-span-2'>
                <Input 
                  type="text"
                  placeholder='VD: NVIDIA GeForce RTX 2050 4 GB GDDR6 VRAM'
                  label="Card màn hình"
                  id="gpu"
                  name="gpu"
                  value={newProduct.gpu}
                  labelClass='text-lg font-semibold'
                  inputClass='w-full p-2 text-md ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-sky-300'
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label htmlFor="description" className='block mb-1 text-lg font-semibold'>Mô tả sản phẩm</label>
              <textarea 
                name="description" 
                id="description" 
                rows={5} 
                placeholder='Mô tả ngắn gọn về sản phẩm...'
                value={newProduct.description}
                className='w-full p-2 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300' 
                onChange={handleInputChange}/>
            </div>
          </div>
          
          <button 
            className='float-right mb-8 bg-green-500 px-2 py-4 text-gray-100 font-semibold hover:bg-green-600'>Xác nhận</button>
        </form>
        <ToastContainer />
      </main>
    </div>
  )
}

export default AddProduct