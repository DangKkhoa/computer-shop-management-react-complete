// import React, { useEffect, useState } from 'react'
// import Header from '../../components/Header.jsx'
// import { NavLink } from 'react-router'
// import ShopHeader from '../../components/Shop/ShopHeader.jsx'
// import axios from 'axios'
// import { div } from 'motion/react-client'

// const Shop = () => {
//   const [products, setProducts] = useState([]);
  
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await axios.get('http://localhost:3000/api/v1/products');
//       if(res.status === 200) {
//         setProducts(res.data.data);
//       }
//     } 
//     fetchProducts();
//   }, [])


//   return (
//       <>
//         <div className='w-96 m-auto mb-6'>
//           <input 
//             type="text" 
//             name="" 
//             id="" 
//             placeholder='Nhập tên sản phẩm muốn tìm'
//             className='w-full shadow-lg p-2 rounded-md ring-1 ring-gray-300 outline-none focus:ring-2 focus:ring-sky-300'/>
//         </div>
//         <section>
          
//         </section>
//         <div className='grid grid-cols-4 gap-8 px-20'>
//           {products.map(p => (
//             <div className='border border-gray-300 p-4 flex flex-col'>
//               <img src={`http://localhost:3000/uploads/products/${p.image}`} alt="" className='w-48 m-auto'/>
//               <p className='text-wrap font-semibold'>{p.name}</p>
//               <p className='font-semibold text-red-500'>{p.retailed_price.toLocaleString()} VND</p>
//             </div>
//           ))}
//         </div>
//       </>

//   )
// }

// export default Shop

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

 


  // Lọc theo category
  // const laptops = products.filter(p => p.category?.toLowerCase().includes("laptop")).slice(0, 8);
  // const pcs = products.filter(p => p.category?.toLowerCase().includes("pc"));
  // const accessories = products.filter(p => p.category?.toLowerCase().includes("accessories"));

  return (
    <div className=''>
      <SearchShop />
      {/* Section 1: Laptop */}
      <section className='mb-6'>
        <Link to='/laptop' className='block mb-6 w-fit mx-auto text-2xl font-bold text-center text-sky-700 hover:underline hover:text-sky-900 transition'>Laptop nổi bật</Link>
        <RenderProducts items={laptops} category={'laptop'}/>
      </section>

      {/* Section 2: PC */}
      <section className='mb-6'>
        <Link to='/pc-desktop' className='block mb-6 w-fit mx-auto text-2xl font-bold text-center text-sky-700 hover:underline hover:text-sky-900 transition'>PC / Máy bàn</Link>
        {/* {renderProducts(pcs, 'pc')} */}
        <RenderProducts items={pcs} category={'pc'}/>
      </section>

      {/* Section 3: Phụ kiện */}
      <section>
        <h2 className='text-2xl font-bold text-center mb-4'>Phụ kiện</h2>
        <RenderProducts items={accessories} category={'accessories'}/>
      </section>
    </div>
  );
};

export default Shop;
