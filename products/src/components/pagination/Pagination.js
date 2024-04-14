import React from 'react';
import styles from './Pagination.module.css'; // Path to your CSS module for styling

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className={styles.pagination}>
            <button 
                className={styles.pageButton}
                disabled={currentPage <= 1} 
                onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>
            <button 
                className={styles.pageButton}
                disabled={currentPage >= totalPages} 
                onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
