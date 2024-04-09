import React from "react";
import styles from "./ProductsTable.module.css"; // Ensure the path is correct

function ProductsTable({ products }) {
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
        </tr>
      </thead>
      <tbody>
        {products.map(
          (
            product // Correctly access properties from the destructured product object
          ) => (
            <tr key={product._id}>
                              <td>{product?.sku}</td> {/* Corrected this line */}

              <td>{product?.name}</td> {/* Corrected this line */}
              <td>{product?.category}</td>
              <td>
                $
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : "N/A"}
              </td>
              <td>{product?.quantity}</td>
              <td>
                <img
                  src={product.image?.url}
                  alt={product?.name}
                  className={styles.productImage}
                />
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default ProductsTable;
