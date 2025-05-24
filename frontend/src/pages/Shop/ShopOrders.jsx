import { useState, useEffect } from 'react'
import DisplayOrderDetail from '../../components/DisplayOrderDetail';
import { useParams, useSearchParams } from 'react-router';
import axios from 'axios';

const ShopOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [ searchParams ] = useSearchParams();
  const q = searchParams.get('q');
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
      const res = await axios.get(`http://localhost:3000/api/v1/orders/${id}`);
      if(res.status === 200) {
        setOrder(res.data.data);
        setUpdatedOrder(res.data.data);
        console.log(res.data.data);
      }
    }

    fetchOrderDetail(id);
  }, [])
  return (
    <DisplayOrderDetail 
      id={id}
      order={order}
      setOrder={setOrder}
      updatedOrder={updatedOrder}
      statusColor={statusColor}
      setUpdatedOrder={setUpdatedOrder}/>
  )
}

export default ShopOrders