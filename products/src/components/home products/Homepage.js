// import React, { useEffect, useState } from "react";
// import CategoriesSidebar from "../categories/CategoriesSideBar";
// import HomeProducts from "./HomeProducts";
// import styles from "./Homepage.module.css";
// import { useLocation, useSearchParams } from "react-router-dom";
// import image1 from "../../images/1.webp";
// import image2 from "../../images/2.webp";
// import image3 from "../../images/3.webp";
// import Slider from "../slider/Slider";
// import generateDummyProducts from "../../utils/dummyData";
// import { filterProductsByCategory } from "../../utils/producCategoryFilter";
// import {useDispatch, useSelector} from 'react-redux'
// import { fetchProducts, fetchProductsTest } from "../../actions/productActions";
// import Pagination from "../pagination/Pagination";

// const images = [image1, image2, image3];

// const Homepage = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = parseInt(searchParams.get('page') || '1');
//   const category = searchParams.get('category') || '';
//   const searchTerm = searchParams.get('search') || '';

//   useEffect(() => {
//     dispatch(fetchProductsTest());
//   }, [dispatch]);

//   const { products, totalItems, totalPages, loading, error } = useSelector(state => state.product);

//   console.log(products, "the product list")
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <Slider images={images} />

//       <div className={styles.homepageContainer}>
//         <CategoriesSidebar onCategorySelect={(category) => setSearchParams({ category, page: '1' })} />
//         <HomeProducts products={products.products} />
//       </div>
//     </>
//   );
// };

// export default Homepage;
import React, { useState } from "react";
import CategoriesSidebar from "../categories/CategoriesSideBar";
import HomeProducts from "./HomeProducts";
import styles from "./Homepage.module.css";
import { useSearchParams } from "react-router-dom";
import Slider from "../slider/Slider";
import Spinner from "../../UI/Spinner";
import { useProducts } from "../hooks/useProducts";

import image1 from "../../images/1.webp";
import image2 from "../../images/2.webp";
import image3 from "../../images/3.webp"

const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const searchTerm = searchParams.get("search") || "";
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");

  const images = [image1, image2, image3]; // Ensure these images are correctly imported

  // Use the useProducts hook with necessary query params
  const { productsData, loading, error, } = useProducts({ page, limit: 32, category, searchTerm, priceRange, sort });

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
