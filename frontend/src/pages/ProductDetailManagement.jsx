import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ProductDetail from '../components/ProductDetail';
import { toast } from 'react-toastify';


const ProductDetailManagement = ({addToCart}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  const { user } = useContext(AuthContext);
  // const { addToCart } = useContext(CartContext);

  const [updatedProduct, setUpdatedProduct] = useState(null);
  const isChanged = JSON.stringify(product) !== JSON.stringify(updatedProduct) || selectedFile;

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
        setPreview(`http://localhost:3000/uploads/products/${res.data.data.image}`);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setSelectedFile(file);
      const objUrl = URL.createObjectURL(file);
      console.log(file);

      setPreview(objUrl)
    }
  }


  

  const handleUpdateProduct = async () => {
    try {
      console.log(updatedProduct);
      const formData = new FormData();
      // for(const [key, value] of Object.entries(updatedProduct)) {
      //   if(key != 'image') {
      //     formData.append(key, value);
      //   }
      // } 
      Object.entries(updatedProduct).forEach(([key, value]) => {
        if(key != 'image') {
          formData.append(key, value);
        }
      })

      if(selectedFile) {
        formData.append('image', selectedFile);
      }

      const res = await axios.patch(`http://localhost:3000/api/v1/products/${id}`, formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if(res.status === 200) {
        toast.success(res.data.message || 'Cập nhật sản phẩm thành công')
      }
    }
    catch(err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  }

  return (
    <main className='mt-2 p-6 w-full'>
      {updatedProduct ? <ProductDetail 
          user={user}
          product={updatedProduct}
          image={preview || ''}
          name={product.name}
          canEdit={canEdit}
          handleValueChange={handleValueChange}
          handleImageChange={handleImageChange}
          handleUpdateProduct={handleUpdateProduct}
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