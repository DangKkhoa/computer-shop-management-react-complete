import React, { useContext, useEffect, useState } from 'react'
import ProductDetail from '../../components/ProductDetail';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { useParams } from 'react-router';
// import ProductDetail from '../ProductDetailManagement'

const ShopProdctDetail = () => {
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState();

  const { id } = useParams();
  useEffect(() => {
      const fetchProductDetail = async () => { 
        const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`, {
          withCredentials: true
        });
  
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
  return (
    <>
      {product && 
        <ProductDetail 
          product={product}
          name={product.name}
          image={`http://localhost:3000/uploads/products/${product.image}`}
          addToCart={addToCart}/>
      }
    </>
  )
}

export default ShopProdctDetail