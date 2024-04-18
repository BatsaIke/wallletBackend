import React from 'react';
import ProductCard from '../../components/products card/ProductsCard';
import styles from './ShopComponent.module.css'; // Make sure to adjust the path to your CSS file

const ShopComponent = ({ products }) => {
  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ShopComponent;
