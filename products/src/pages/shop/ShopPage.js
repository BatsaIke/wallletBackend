import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesSidebar from '../../components/categories/CategoriesSideBar';
import ProductCard from '../../components/products card/ProductsCard';
import styles from './ShopPage.module.css';
import { fetchProducts } from '../../actions/productActions'; // Adjust the import path as necessary
import { filterProductsByCategory } from '../../utils/producCategoryFilter';

const ShopPage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 35;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const allProducts = useSelector(state => state.product.products); // Adjust according to your Redux state structure
  const filteredProducts = filterProductsByCategory(allProducts, selectedCategory);

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.shopageContainer}>
      <CategoriesSidebar onCategorySelect={(category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page when category changes
      }} />
      <div className={styles.pageDiv}>
      <div className={styles.productsGrid}>
        {currentProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className={styles.pagination}>
        {[...Array(totalPages).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className={styles.pageNumber}>
            {number + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ShopPage;
