import React, { useEffect, useState } from "react";
import CategoriesSidebar from "../categories/CategoriesSideBar";
import HomeProducts from "./HomeProducts";
import styles from "./Homepage.module.css";
import { useSearchParams } from "react-router-dom";
import Slider from "../slider/Slider";
import Spinner from "../../UI/Spinner";
import { useProducts } from "../hooks/useProducts";

import image1 from "../../images/1.jpeg";
import image2 from "../../images/2.jpeg";
import image3 from "../../images/3.jpeg";

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


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        setIsVisible(true);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

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
        <HomeProducts products={productsData.products} />
      </div>
    </>
  );
};

export default Homepage;
