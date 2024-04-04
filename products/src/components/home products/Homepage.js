import React, { useState } from "react";
import CategoriesSidebar from "../categories/CategoriesSideBar";
import HomeProducts from "./HomeProducts";
import styles from "./Homepage.module.css";

import image1 from "../../images/1.webp";
import image2 from "../../images/2.webp";
import image3 from "../../images/3.webp";
import Slider from "../slider/Slider";
import generateDummyProducts from "../../utils/dummyData";
import { filterProductsByCategory } from "../../utils/producCategoryFilter";

const images = [image1, image2, image3];

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const allProducts = generateDummyProducts();

  // Use the filtering function
  const products = filterProductsByCategory(allProducts, selectedCategory);

  return (
    <>
      <Slider images={images} />
      <div className={styles.homepageContainer}>
        <CategoriesSidebar onCategorySelect={setSelectedCategory} />
        <HomeProducts products={products} />
      </div>
    </>
  );
};

export default Homepage;
