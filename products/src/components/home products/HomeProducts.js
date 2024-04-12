// Homepage.js
import React from 'react';
import styles from './Homepage.module.css'; // Assume you have this CSS module for styling
import ProductCard from '../products card/ProductsCard';
import { useNavigate } from 'react-router-dom';

const HomeProducts = ({ products }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/shop');
  };


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
