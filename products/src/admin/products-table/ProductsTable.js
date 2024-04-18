// Inside ProductsTable.js
import React from "react";
import styles from "./ProductsTable.module.css"; // Ensure the path is correct

function ProductsTable({ products, onEdit, onDelete }) {
  console.log(products,"IN HERE")
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
          <th>Actions</th> {/* Add a header for actions */}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>₵ {typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}</td>
            <td>{product.quantity}</td>
            <td>
              <img src={product.image?.url} alt={product.name} className={styles.productImage} />
            </td>
            <td>
            <div className={styles.actionButtons}>
                <button onClick={() => onEdit(product)} className={styles.editButton}>Edit</button>
                <button onClick={() => onDelete(product._id)} className={styles.deleteButton}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
