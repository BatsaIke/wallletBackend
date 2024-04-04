import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling, FaCandyCane, FaWineBottle, FaTools } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import styles from './CategoriesSidebar.module.css';

const CategoriesSidebar = ({ onCategorySelect }) => {
    const [isActive, setIsActive] = useState(false);

    // Function to handle category selection and close sidebar
    const handleCategorySelect = (category) => () => {
        setIsActive(false); // Close the sidebar
        onCategorySelect(category); // Select the category
    };

    return (
        <>
            <button
              className={styles.toggleButton}
              onClick={() => setIsActive(!isActive)}
            >
              <IoMenu /> <h6>categories</h6>
            </button>
            
            <aside className={`${styles.sidebar} ${isActive ? styles.active : ''}`}>
                <h2 className={styles.categoryHeader}>Categories</h2>
                <ul className={styles.categoriesList}>
                    <li className={styles.categoryItem} onClick={handleCategorySelect('Flowers')}>
                        <FaSeedling /> Flowers
                    </li>
                    <li className={styles.categoryItem} onClick={handleCategorySelect('Edibles')}>
                        <FaCandyCane /> Edibles
                    </li>
                    <li className={styles.categoryItem} onClick={handleCategorySelect('Drinks')}>
                        <FaWineBottle /> Drinks
                    </li>
                    <li className={styles.categoryItem} onClick={handleCategorySelect('Accessories')}>
                        <FaTools /> Accessories
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default CategoriesSidebar;
