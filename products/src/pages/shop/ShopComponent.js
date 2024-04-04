import React, { useState } from 'react';
import styles from './ShopPage.module.css'; // Make sure to create and import this CSS module
import ProductCard from '../../components/products card/ProductsCard';
import generateDummyProducts from '../../utils/dummyData';

const ShopComponent = () => {
    const products = generateDummyProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 35; // 5 products per row * 7 rows

    // Calculate the current products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className={styles.productsGrid}>
                {currentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className={styles.pagination}>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className={styles.pageNumber}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ShopComponent;
