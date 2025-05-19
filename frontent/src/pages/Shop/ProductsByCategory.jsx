import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import RenderProducts from '../../components/Shop/RenderProducts';
import SearchShop from '../../components/Shop/SearchShop';
import { motion } from 'motion/react';
import Filter from '../../components/Shop/Filter';

const ProductsByCategory = () => {
  const { category } = useParams();
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [endProduct, setEndProduct] = useState(false);
  const [sortFilter, setSortFilter] = useState();

  useEffect(() => {
    document.title = category;
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/products/category/${category}?sort=${sortFilter}&limit=12&offset=${offset*12}`);
        if(res.status === 200) {
          if(res.data.data.length === 0 || res.data.data.length < 12) {
            setEndProduct(true);
          }
          setProducts(res.data.data);
          // setOffset(prev => prev + 1);
        }

      }
      catch(err) {
        toast.error('Lỗi xảy ra khi lấy sản phẩm', {
          position: 'top-right',
          autoClose: 2000
        });
        console.error(err);
      }
    }

    fetchProductsByCategory();
  }, [category])

  const handleViewMoreClick = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/products/category/${category}?sort=${sortFilter}&limit=12&offset=${(offset + 1)*12}`);
        if(res.status === 200) {
          if(res.data.data.length === 0 || res.data.data.length < 12) {
            setEndProduct(true);
          }
          setProducts(prev => [...prev, ...res.data.data]);
          setOffset(prev => prev + 1);
        }

      }
      catch(err) {
        toast.error('Lỗi xảy ra khi lấy sản phẩm', {
          position: 'top-right',
          autoClose: 2000
        });
        console.error(err);
      }
  }

  const handleSortChange = async (sortValue) => {
    
    if(!sortValue) return ;
    setOffset(0);
    setSortFilter(sortValue);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/products/category/${category}?sort=${sortValue}&limit=12&offset=${offset*12}`);
      console.log(res);
      if(res.status === 200) {
        
        if(res.data.data.length === 0 || res.data.data.length < 12) {
          setEndProduct(true);
        }
        setProducts(res.data.data);
        
      }
    }
    catch(err) {
      toast.error('Lỗi xảy ra khi lấy sản phẩm', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true
      });
      console.error(err);
    }
  }
  return (
    <div className=''>
      <SearchShop />
      <Filter onSortChange={handleSortChange}/>
      <RenderProducts items={products} category={category}/>
      {products.length > 0 &&
        <div className='w-full flex justify-center'>
          <motion.button 
            whileHover={{scale: !endProduct ? 1.1 : 1}}
            whileTap={{scale: !endProduct ? 1 : 0.8}}
            className='bg-sky-200 ring-2 ring-sky-500 px-4 py-2 text-lg rounded-md disabled:opacity-50' 
            style={{cursor: `${endProduct ? 'default' : ''}`}}
            onClick={handleViewMoreClick}
            disabled={endProduct}>
              Xem thêm
          </motion.button>
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default ProductsByCategory