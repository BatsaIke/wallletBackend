import React from "react";
import styles from "./ProductsTable.module.css"; // Ensure the path is correct

function ProductsTable({ products, onEdit, onDelete }) {
  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td data-label='SKU'>{product.sku}</td>
            <td data-label='Product Name'>{product.name}</td>
            <td data-label='Category'>{product.category}</td>
            <td data-label='Price'>
              ₵{" "}
              {typeof product.price === "number"
                ? product.price.toFixed(2)
                : "N/A"}
            </td>
            <td data-label='Quantity'>{product.quantity}</td>
            <td data-label='Image'>
              <img
                src={product.image?.url}
                alt={product.name}
                className={styles.productImage}
              />
            </td>
            <td data-label='Actions'>
              <div className={styles.actionButtons}>
                <button
                  onClick={() => onEdit(product)}
                  className={styles.editButton}>
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
