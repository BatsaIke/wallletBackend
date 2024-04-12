import React from 'react';
import { useDispatch } from 'react-redux';
import Spinner from '../../../UI/Spinner';
import styles from './OrderDetails.module.css';
import { updateOrderStatus } from '../../../actions/orderActions';

const OrderDetails = ({ order, loading }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleUpdateStatus = (newStatus) => {
    if (order._id && newStatus !== order.status) {
      try {
        let status =  dispatch(updateOrderStatus(order._id, newStatus))
        if(status.staus==="success") {
          dispatch(setAlert("Order status updated successfully.", "success"));

        }

      } catch (error) {
        
      }
    ;
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
              <strong>Status:</strong> {order.status}
              <button className={`${styles.statusButton} ${styles.fulfillButton}`}
                      onClick={() => handleUpdateStatus('Fulfilled')}
                      disabled={order.status === 'Fulfilled'}>
                Fulfill
              </button>
              <button className={`${styles.statusButton} ${styles.cancelButton}`}
                      onClick={() => handleUpdateStatus('Cancelled')}
                      disabled={order.status === 'Cancelled'}>
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

export default OrderDetails;
