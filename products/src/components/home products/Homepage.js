import React, { useEffect, useState } from "react";
import CategoriesSidebar from "../categories/CategoriesSideBar";
import HomeProducts from "./HomeProducts";
import styles from "./Homepage.module.css";

import image1 from "../../images/1.webp";
import image2 from "../../images/2.webp";
import image3 from "../../images/3.webp";
import Slider from "../slider/Slider";
import generateDummyProducts from "../../utils/dummyData";
import { filterProductsByCategory } from "../../utils/producCategoryFilter";
import {useDispatch, useSelector} from 'react-redux'
import { fetchProducts } from "../../actions/productActions";

const images = [image1, image2, image3];

const Homepage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  // Assuming the structure of state.product is something like { products: [...], loading: boolean, error: null }
  const { products: allProducts, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Ensure allProducts is an array before filtering, and handle loading or error state appropriately
  const filteredProducts = selectedCategory ? filterProductsByCategory(allProducts, selectedCategory) : allProducts;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Slider images={images} />
      <div className={styles.homepageContainer}>
        <CategoriesSidebar onCategorySelect={setSelectedCategory} />
        <HomeProducts products={filteredProducts} />
      </div>
    </>
  );
};


export default Homepage;
