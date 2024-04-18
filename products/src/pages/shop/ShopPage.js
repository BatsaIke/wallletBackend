import React, { useState } from 'react';
import CategoriesSidebar from '../../components/categories/CategoriesSideBar';
import Spinner from '../../UI/Spinner';
import ProductCard from '../../components/products card/ProductsCard';
import styles from './ShopPage.module.css';
import Pagination from '../../components/pagination/Pagination';
import { useSearchParams } from "react-router-dom";
import { useProducts } from '../../components/hooks/useProducts';


const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 32;

  // Use the custom hook for fetching products
  const { productsData, totalPages, loading, error } = useProducts({ limit, page: currentPage });
  const handleCategorySelect = (category) => {
    setSearchParams({ page: "1", category, search: searchTerm, priceRange, sort });
  };

  const handleSortChange = (sortValue) => {
    setSort(sortValue);
    setSearchParams({ page: "1", category, search: searchTerm, priceRange, sort: sortValue });
  };

  const handlePriceFilterChange = (newRange) => {
    setPriceRange(newRange);
    setSearchParams({ page: "1", category, search: searchTerm, priceRange: newRange, sort });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Spinner />;
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
