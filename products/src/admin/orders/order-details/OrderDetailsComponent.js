import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import { fetchOrderById,updateOrderStatus  } from "../../../actions/orderActions";
import {useDispatch, useSelector} from'react-redux' 

const OrderDetailsComponent = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector(state => state.order);

  useEffect(() => {
    if (!currentOrder || currentOrder._id !== orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId, currentOrder]);

  const handleStatusChange = (newStatus) => {
    if (currentOrder && currentOrder.status !== newStatus) {
      dispatch(updateOrderStatus(orderId, newStatus));
    }
  };

  if (!currentOrder) {
    return <div>No orders to display</div>;
  }

  return (
    <OrderDetails
      handleStatusChange={handleStatusChange}
      loading={loading}
      order={currentOrder}
    />
  );
};

export default OrderDetailsComponent;