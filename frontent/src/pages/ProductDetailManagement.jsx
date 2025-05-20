import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ProductDetail from '../components/ProductDetail';


const ProductDetailManagement = ({addToCart}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);
  // const { addToCart } = useContext(CartContext);

  const [updatedProduct, setUpdatedProduct] = useState(null);
  const isChanged = JSON.stringify(product) !== JSON.stringify(updatedProduct);

  let canEdit;  
  if(user) {
    canEdit = user && user.role === 'ADMIN' || user.role === 'SALESPERSON';
    console.log(user);
  }

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
      ...prev, 
      [name]: value
    }))
  }

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product])

  useEffect(() => {
    const fetchProductDetail = async () => { 
      const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`, {
        withCredentials: true
      });

      
      console.log(res.data);

      if(res.status === 200) {
        setProduct(res.data.data);
      }
      else if(res.status === 404) {
        setErrorMessage(res.data.message);
      }
      else {
        setErrorMessage("Error while fetching product detail");
      }
    }
    fetchProductDetail();

  }, [])

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === id);

    if(existingItem) {
      existingItem.quantity += 1;
    }
    else {
      cart.push({...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Thêm sản phẩm thành công');
  }

  return (
    // <>
    //   {product ? <main className='mt-2 p-6 w-full'>
    //     <div className='grid grid-cols-2'>
    //       <div>
    //         <h2 className='text-xl font-semibold mb-4'>{product.name}</h2>
    //         <div className='flex'>
    //           <div className='w-64 h-64 bg-white mb-4'>
    //             <img src={`http://localhost:3000/uploads/products/${product.image}`} alt="" className='w-full'/>
    //             {canEdit ? <>
    //                 <input type="file" />
    //             </>
    //             :
    //             ''}
                
    //           </div>
    //           <div className='ml-4 text-lg font-semibold'>
    //             Tình trạng: 
    //             {product.quantity > 0 ? 
    //               <span className='text-2xl text-green-500 font-bold italic'> Còn hàng</span> 
    //               :
    //               <span className='text-2xl text-red-500 font-bold italic'> Hết hàng</span>
    //             }
    //           </div>
    //         </div>
    //         {!user ? <div className=''>
    //           <button className='px-3 py-2 bg-green-500 text-white rounded-md mr-4 hover:bg-green-600' onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
    //           <button className='px-3 py-2 bg-white border border-green-500 text-green-500 rounded-md hover:bg-gray-100'>Mua ngay</button>
    //           </div> 
    //           : 
    //           <></>
    //         }
    //       </div>
    //       <div className='shadow-lg p-2'>
    //         <p className='text-lg font-semibold mb-4'>Thông số kỹ thuật</p>
    //         <table className='table-fixed'>
    //           <tbody>
    //             <tr className='p-4'>
    //               <td className='p-2 w-[200px] font-semibold'>ID</td>
    //               <td className='p-2 w-3/4'>
    //                 <input 
    //                   type="text" 
    //                   name='id'
    //                   value={product.id} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}
    //                   />
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 w-[200px] font-semibold'>Tên sản phẩm</td>
    //               <td className='p-2 w-3/4'>
    //                 <input 
    //                   type="text" 
    //                   name="name" 
    //                   value={product.name} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             {user && 
    //               <>
    //                 <tr className='p-4'>
    //                   <td className='p-2 font-semibold'>Ngày nhập</td>
    //                   <td className='px-4 py-2 w-3/4 text-right '>{new Date(product.created_at).toLocaleString()}</td>
    //                 </tr>
                  
    //                 <tr className='p-4'>
    //                   <td className='p-2 font-semibold'>Giá nhập</td>
    //                   <td className='p-2 w-3/4'>
    //                     <input 
    //                       type="text" 
    //                       name='imported_price'
    //                       value={product.imported_price || ''} 
    //                       className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                       onChange={handleValueChange}
    //                       readOnly={!canEdit}/>
    //                   </td>
    //                 </tr>
    //               </>
    //             }
    //             <tr className='p-4'>
    //               <td className='p-2 font-semibold'>Giá bán</td>
    //               <td className='p-2'>
    //                 <input 
    //                   type="text" 
    //                   name='retailed_price'
    //                   value={product.retailed_price.toLocaleString()} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             {user && <>
    //               <tr className='p-4'>
    //                 <td className='p-2 font-semibold'>Danh mục</td>
    //                 <td className='px-4 py-2 w-3/4 text-right'>{product.category}</td>
    //               </tr>
    //               <tr className='p-4'>
    //                 <td className='p-2 font-semibold'>Số lượng</td>
    //                 <td className='px-4 py-2 w-3/4 text-right'>
    //                   <input 
    //                     type="number" 
    //                     name='retailed_price'
    //                     value={product.quantity} 
    //                     className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                     onChange={handleValueChange}
    //                     readOnly={!canEdit}/>
    //                 </td>
    //               </tr>
    //             </>}
    //             <tr className='p-4'>
    //               <td className='p-2 font-semibold'>CPU</td>
    //               <td className='p-2 w-3/4'>
    //                 <input 
    //                   type="text" 
    //                   name='cpu'
    //                   value={product.cpu} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 font-semibold'>RAM</td>
    //               <td className='p-2 w-3/4'>
    //                 <input 
    //                   type="text" 
    //                   name='ram'
    //                   value={product.ram} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 font-semibold'>Bộ nhớ</td>
    //               <td className='p-2 w-3/4'>
    //                 <input 
    //                   type="text" 
    //                   name='storage'
    //                   value={product.storage} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 w-[200px] font-semibold'>Màn hình</td>
    //               <td className='p-2'>
    //                 <input 
    //                   type="text" 
    //                   name="screen"
    //                   value={product.screen} 
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 w-[200px] font-semibold'>Card đồ họa</td>
    //               <td className='p-2'>
    //                 <input 
    //                   type="text" 
    //                   value={product.gpu}
    //                   name="gpu"
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>
    //             <tr className='p-4'>
    //               <td className='p-2 w-[200px] font-semibold'>Cân nặng</td>
    //               <td className='p-2'>
    //                 <input 
    //                   type="text" 
    //                   value={product.weight}
    //                   name="weight"
    //                   className={`w-full text-right px-2 ${!canEdit ? 'outline-none' : ''}`} 
    //                   onChange={handleValueChange}
    //                   readOnly={!canEdit}/>
    //               </td>
    //             </tr>

    //           </tbody>
    //         </table>
    //       </div>

    //       <div className='col-span-full mt-4'>
    //         <p className='text-lg font-semibold text-amber-500'>Đặc điểm nổi bật</p>
    //         <textarea 
    //           name="description" 
    //           id="description" 
    //           rows={6} 
    //           value={product.description} 
    //           className={`w-full p-2 ${canEdit ? 'border-2' : ''}`}
    //           onChange={handleValueChange}
    //           readOnly={!canEdit}/>
    //       </div>
           
    //     </div>
    //     {user && <button 
    //       className='px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md disabled:opacity-50 disabled:pointer-events-none'
    //       disabled={!isChanged}>
    //         Cập nhật
    //     </button>}
    //   </main>
    //   :
    //   <div>{errorMessage}</div>
    //   }
    // </>
    <main className='mt-2 p-6 w-full'>
      {updatedProduct ? <ProductDetail 
          user={user}
          product={updatedProduct}
          name={product.name}
          canEdit={canEdit}
          handleValueChange={handleValueChange}
          isChanged={isChanged}
          errorMessage={errorMessage}
        />
        :
        <div>Đang tải...</div>
      }
    </main>
  )
}

export default ProductDetailManagement