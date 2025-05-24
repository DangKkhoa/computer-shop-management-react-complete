import { useState, useEffect, useContext } from 'react'
import DisplayOrderDetail from '../components/DisplayOrderDetail';
import { useParams, useSearchParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OrderDetail = () => {
  const { id } = useParams();
  const {user} = useContext(AuthContext);
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
      const res = await axios.get(`http://localhost:3000/api/v1/orders/${id}`, { withCredentials: true });
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
      user={user}
      id={id}
      order={order}
      setOrder={setOrder}
      updatedOrder={updatedOrder}
      statusColor={statusColor}
      setUpdatedOrder={setUpdatedOrder}/>
  )
}

export default OrderDetail