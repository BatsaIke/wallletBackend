import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import { fetchOrderById } from "../../../actions/orderActions";
import {useDispatch, useSelector} from'react-redux' 

const OrderDetailsComponent = () => {
    const dispatch = useDispatch()
  const { orderId } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("");
 const {currentOrder, loading, status}= useSelector((state)=>state.order)

console.log(currentOrder,'currenet order oo')

useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        const fetchedOrder = await dispatch(fetchOrderById(orderId));
        if (fetchedOrder.status === "success") {
          
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } 
    };
  
    loadOrderDetails();
  }, [dispatch, orderId]); // Added dispatch to the dependency array
  

  const handleStatusChange = async (newStatus) => {
   
    // await updateOrderStatus(orderId, newStatus);
    // Optionally, re-fetch order details to reflect the update
  };
  return (
    <>
      <OrderDetails
        handleStatusChange={handleStatusChange}
        loading={loading}
        order={currentOrder}
        status={status}
      />
     
    </>
  );
};

export default OrderDetailsComponent;
