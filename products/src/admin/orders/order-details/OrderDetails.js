import React from 'react';
import Spinner from '../../../UI/Spinner';
import styles from './OrderDetails.module.css'; // Ensure this path is correct

const OrderDetails = ({ order, loading, status, handleStatusChange }) => {
    console.log(order,"prder")
  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Order Details</h2>
      {order ? (
        <>
          <div className={styles.orderInfo}>
            <p>Order ID: {order._id}</p>
            <div>
              Status:
              <select
                className={styles.statusSelect}
                value={status}
                onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <h3>Products</h3>
          {order.items.map((item) => (
            <div key={item._id} className={styles.productItem}> 
              <p className={styles.productHeader}>SKU: {item.product.sku}</p>
              <p>Name: {item.product.name}</p>
              {/* Add more product details as needed */}
            </div>
          ))}
        </>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default OrderDetails;
