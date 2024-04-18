import React from 'react';
import styles from './Homepage.module.css';
import ProductCard from '../products card/ProductsCard';
import { useNavigate } from 'react-router-dom';

const HomeProducts = ({ products = [] }) => {  // Default to an empty array if products is undefined
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/shop');
  };

  // Ensure products is an array and has items before attempting to render them
  if (!products || products.length === 0) {
    return <div>No products found</div>; // Display message or loading spinner if no products
  }

  return (
    <div className={styles.homepage}>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <button className={styles.seeMore} onClick={handleNavigate}>See More</button>
    </div>
  );
};

export default HomeProducts;
