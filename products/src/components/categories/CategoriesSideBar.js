import React, { useState, useEffect } from "react";
import {
  FaSeedling,
  FaCandyCane,
  FaWineBottle,
  FaTools,
  FaList,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import styles from "./CategoriesSidebar.module.css";

const CategoriesSidebar = ({onCategorySelect = () => {},
onSortChange = () => {},
onPriceFilterChange = () => {},
}) => {
  const [isActive, setIsActive] = useState(false);
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsActive(true); // Always open on large screens
      } else {
        setIsActive(false); // Allow toggle on small screens
      }
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategorySelect = (category) => {
    setIsActive(false);
    onCategorySelect(category);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
};


  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    onPriceFilterChange(e.target.value);
  };

  return (
    <>
      <button className={styles.toggleButton} onClick={() => setIsActive(!isActive)}>
                <IoMenu /> Categories
            </button>

      <aside className={`${styles.sidebar} ${isActive ? styles.active : ""}`}>
        <h2 className={styles.categoryHeader}>Filter by</h2>
        <ul className={styles.categoriesList}>
          <li
            className={styles.categoryItem}
            onClick={() => handleCategorySelect("")}
          >
            <FaList /> All
          </li>
          <li
            className={styles.categoryItem}
            onClick={() => handleCategorySelect("Flowers")}
          >
            <FaSeedling /> Flowers
          </li>
          <li
            className={styles.categoryItem}
            onClick={() => handleCategorySelect("Edibles")}
          >
            <FaCandyCane /> Edibles
          </li>
          <li
            className={styles.categoryItem}
            onClick={() => handleCategorySelect("Drinks")}
          >
            <FaWineBottle /> Drinks
          </li>
          <li
            className={styles.categoryItem}
            onClick={() => handleCategorySelect("Accessories")}
          >
            <FaTools /> Accessories
          </li>
        </ul>
        <div className={styles.filterSection}>
          <div className={styles.filterTitle}>Sort by</div>
          <select className={styles.sortSelect} onChange={handleSortChange}>
            <option value="createdAt_desc">Newest</option>
            <option value="createdAt_asc">Oldest</option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <div className={styles.filterTitle}>Price Range</div>
          <input
            type="range"
            className={styles.priceRangeInput}
            value={priceRange}
            onChange={handlePriceChange}
            min="0"
            max="500"
          />
          <div>Up to ${priceRange}</div>
        </div>
      </aside>
    </>
  );
};

export default CategoriesSidebar;
