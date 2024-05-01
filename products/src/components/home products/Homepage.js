import React, { useEffect, useState, lazy, Suspense } from "react";
import CategoriesSidebar from "../categories/CategoriesSideBar";
import styles from "./Homepage.module.css";
import { useSearchParams } from "react-router-dom";
import Slider from "../slider/Slider";
import Spinner from "../../UI/Spinner";
import { useProducts } from "../hooks/useProducts"; // Import the useProducts hook

// Import the images
import image1 from "../../images/1.jpeg";
import image2 from "../../images/2.jpeg";
import image3 from "../../images/3.jpeg";

// Lazy load the HomeProducts component
const LazyHomeProducts = lazy(() => import("./HomeProducts"));

const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");

  const images = [image1, image2, image3];

  const { productsData, loading, error, setIsVisible } = useProducts({
    page,
    limit: 20,
    category,
    searchTerm,
    priceRange,
    sort,
  });

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
  //       setIsVisible(true);
  //     }
  //   };
  
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Slider images={images} />
      <div className={styles.homepageContainer}>
        <CategoriesSidebar
          onCategorySelect={handleCategorySelect}
          onSortChange={handleSortChange}
          onPriceFilterChange={handlePriceFilterChange}
        />
        <Suspense fallback={<Spinner />}>
          <LazyHomeProducts products={productsData.products} />
        </Suspense>
      </div>
    </>
  );
};

export default Homepage;
