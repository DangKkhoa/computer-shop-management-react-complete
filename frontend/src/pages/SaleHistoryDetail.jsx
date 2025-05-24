import { useState, useEffect, useContext } from 'react'
import DisplayOrderDetail from '../components/DisplayOrderDetail';

import { useParams } from 'react-router';
import axios from 'axios';
import IsLoading from '../components/IsLoading';
import { AuthContext } from '../context/AuthContext';

const SaleHistoryDetail = () => {
  const { id } = useParams();
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const statusColor = {
    'PENDING': 'text-amber-500',
    'CONFIRMED': 'text-green-500',
    'CANCELLED': 'text-red-500'
  }

  const [updatedOrder, setUpdatedOrder] = useState();
  const isEdited = JSON.stringify(updatedOrder) != JSON.stringify(order);
  useEffect(() => {
    document.title = `Đơn hàng #${id}`;
    const fetchOrderDetail = async (id) => {
      const res = await axios.get(`http://localhost:3000/api/v1/sale-history/${id}`, { withCredentials: true });
      if(res.status === 200) {
        setOrder(res.data.data);
        setUpdatedOrder(res.data.data);
        // setIsLoading(false);
        console.log(res.data.data);
      }
    }

    fetchOrderDetail(id);
  }, [])

  useEffect(() => {
    setIsLoading(false);
  }, [order])
  return (
    <>
      {isLoading ? 
        <IsLoading /> 
        : 
        <DisplayOrderDetail
          user={user} 
          id={id}
          order={order}
          setOrder={setOrder}
          updatedOrder={updatedOrder}
          statusColor={statusColor}
          setUpdatedOrder={setUpdatedOrder}/>}
    </>
  )
}

export default SaleHistoryDetail