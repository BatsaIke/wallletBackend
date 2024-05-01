import React, { useEffect, useState } from 'react';
import CategoriesSidebar from '../../components/categories/CategoriesSideBar';
import Spinner from '../../UI/Spinner';
import ProductCard from '../../components/products card/ProductsCard';
import styles from './ShopPage.module.css';
import Pagination from '../../components/pagination/Pagination';
import { useSearchParams } from "react-router-dom";
import { useProducts } from '../../components/hooks/useProducts';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const searchTerm = searchParams.get('search') || '';
  const [priceRange, setPriceRange] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 32;

  // Use the custom hook for fetching products
  const { productsData, totalPages, loading, error, setIsVisible } = useProducts({
    limit,
    page: currentPage,
  });

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSearchParams({ page: '1', category, search: searchTerm, priceRange, sort });
  };

  // Function to handle sort change
  const handleSortChange = (sortValue) => {
    setSort(sortValue);
    setSearchParams({ page: '1', category, search: searchTerm, priceRange, sort: sortValue });
  };

  // Function to handle price filter change
  const handlePriceFilterChange = (newRange) => {
    setPriceRange(newRange);
    setSearchParams({ page: '1', category, search: searchTerm, priceRange: newRange, sort });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsVisible]);

  if (loading && currentPage === 1) return <Spinner />;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className={styles.shopageContainer}>
      <CategoriesSidebar
          onCategorySelect={handleCategorySelect}
          onSortChange={handleSortChange}
          onPriceFilterChange={handlePriceFilterChange}
        />
      <div className={styles.pageDiv}>
      <div className={styles.productsGrid}>
          {productsData && productsData.products && productsData.products.map(product => ( 
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default ShopPage;
