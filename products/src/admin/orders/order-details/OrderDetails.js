import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../UI/Spinner";
import styles from "./OrderDetails.module.css";
import { updateOrderStatus } from "../../../actions/orderActions";
import { set_Alert } from "../../../actions/alertAction";

const OrderDetails = ({ order, loading }) => {
  const dispatch = useDispatch();
  
  // It's unclear why orderStatus is fetched separately if you already have the order prop
  // Ensure this useSelector does not contradict or duplicate the order prop
  const orderStatus = useSelector(state => state.order.currentOrder?.status);

  const handleUpdateStatus = async (newStatus) => {
    if (order._id && newStatus !== orderStatus) {
      try {
        await dispatch(updateOrderStatus(order._id, newStatus));
        dispatch(set_Alert("Order status updated successfully.", "success"));
      } catch (error) {
        console.error("Failed to update status:", error);
        dispatch(set_Alert("Failed to update order status.", "error"));
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Order Details</h2>
      {order ? (
        <>
          <div className={styles.orderInfo}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Delivery Contact:</strong> {order.deliveryContact}</p>
            <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
            <p><strong>Additional Information:</strong> {order.additionalInfo}</p>

            <div className={styles.statusControl}>
              <strong>Status:</strong> {orderStatus}
              <button className={`${styles.statusButton} ${styles.fulfillButton}`}
                      onClick={() => handleUpdateStatus("Fulfilled")}
                      disabled={orderStatus === "Fulfilled"}>
                Fulfill
              </button>
              <button className={`${styles.statusButton} ${styles.cancelButton}`}
                      onClick={() => handleUpdateStatus("Cancelled")}
                      disabled={orderStatus === "Cancelled"}>
                Cancel
              </button>
            </div>
          </div>
          <h3>Products</h3>
          {order.items.map((item, index) => (
            <div key={index} className={styles.productItem}>
              <p><strong>SKU:</strong> {item.product.sku}</p>
              <p><strong>Name:</strong> {item.product.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No order found.</p>
      )}
    </div>
  );
};

export default OrderDetails
