import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import RenderProducts from '../../components/Shop/RenderProducts';
import SearchShop from '../../components/Shop/SearchShop';
import Filter from '../../components/Shop/Filter';
// import { Filter } from 'lucide-react';

const SearchProductPage = () => {
  const [ searchParams ] = useSearchParams();
  const q = searchParams.get('q');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/products/search?q=${q}`);
        if(res.status === 200) {
          setProducts(res.data.data);
        }
      }
      catch(err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, [q])
  return (
    <div className=''>
      <SearchShop />
      <Filter />
      <h1 className='text-2xl font-semibold mb-4'>Tìm kiếm theo: `{q}`</h1>
      {products.length > 0 ? 
        <RenderProducts items={products} />
        :  
        <div className='w-full  flex justify-center items-center'>
          <span className='text-lg text-gray-700'>Không tìm thấy sản phẩm</span>
        </div>
      }
      
    </div>
  )
}

export default SearchProductPage