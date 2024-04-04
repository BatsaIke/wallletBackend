// Homepage.js
import React from 'react';
import styles from './Homepage.module.css'; // Assume you have this CSS module for styling
import ProductCard from '../products card/ProductsCard';

const HomeProducts = ({ products }) => {
  return (
    <div className={styles.homepage}>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className={styles.seeMore}>See More</button>
    </div>
  );
};

export default HomeProducts;
