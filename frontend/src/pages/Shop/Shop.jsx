import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router';
import RenderProducts from '../../components/Shop/RenderProducts';
import SearchShop from '../../components/Shop/SearchShop';

const Shop = () => {
  const [laptops, setLaptops] = useState([]);
  const [pcs, setPcs] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    document.title = 'Nhóm 7'
    const fetchProductsLaptop = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/products/category/laptop');
      if (res.status === 200) {
        setLaptops(res.data.data);
      }
    };
    const fetchProductsPc = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/products/category/pc?');
      if (res.status === 200) {
        setPcs(res.data.data);
      }
    };
    const fetchProductsAccessories = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/products/category/accessories');
      if (res.status === 200) {
        setAccessories(res.data.data);
      }
    };
    fetchProductsLaptop();
    fetchProductsPc();
    fetchProductsAccessories();
  }, []);

 

  return (
    <div className=''>
      <SearchShop />
      {/* Section 1: Laptop */}
      <section className='mb-6'>
        <Link to='/products/laptop' className='block mb-6 w-fit mx-auto text-2xl font-bold text-center text-sky-700 hover:underline hover:text-sky-900 transition'>Laptop nổi bật</Link>
        <RenderProducts items={laptops} category={'laptop'}/>
      </section>

      {/* Section 2: PC */}
      <section className='mb-6'>
        <Link to='/products/pc' className='block mb-6 w-fit mx-auto text-2xl font-bold text-center text-sky-700 hover:underline hover:text-sky-900 transition'>PC / Máy bàn</Link>
        {/* {renderProducts(pcs, 'pc')} */}
        <RenderProducts items={pcs} category={'pc'}/>
      </section>

      {/* Section 3: Phụ kiện */}
      <section>
        <Link to='/products/accessories' className='block mb-6 w-fit mx-auto text-2xl font-bold text-center text-sky-700 hover:underline hover:text-sky-900 transition'>Phụ kiện</Link>
        <RenderProducts items={accessories} category={'accessories'}/>
      </section>
    </div>
  );
};

export default Shop;
