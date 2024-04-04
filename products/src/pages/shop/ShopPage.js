import React, { useState } from 'react'
import CategoriesSidebar from '../../components/categories/CategoriesSideBar'
import styles from './ShopPage.module.css'
import ShopComponent from './ShopComponent'
import { filterProductsByCategory } from '../../utils/producCategoryFilter'
import generateDummyProducts from '../../utils/dummyData'

const ShopPage = () => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const allProducts = generateDummyProducts();

  // Use the filtering function
  const products = filterProductsByCategory(allProducts, selectedCategory);
  return (
    <div className={styles.shopageContainer}>
        
    <CategoriesSidebar  onCategorySelect={setSelectedCategory}/>
    <ShopComponent  products={products}/>
</div>
  )
}

export default ShopPage