import React from 'react';
import Spinner from '../../../UI/Spinner';
import styles from './OrderDetails.module.css'; // Ensure this path is correct

const OrderDetails = ({ order, loading, status, handleStatusChange }) => {
  if (loading) return <Spinner />;

  const updateStatus = (newStatus) => {
    handleStatusChange(newStatus);
    window.location.reload(); // Consider this for real-time updates, or use state management
  };

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
                      onClick={() => updateStatus('Fulfilled')}
                      disabled={order.status === 'Fulfilled'}>
                Fulfill
              </button>
              <button className={`${styles.statusButton} ${styles.cancelButton}`}
                      onClick={() => updateStatus('Cancelled')}
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
