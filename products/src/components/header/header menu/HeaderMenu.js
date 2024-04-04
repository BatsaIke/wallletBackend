import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import styles from './HeaderMenu.module.css'; // Import the CSS module

const HeaderMenu = () => {
    return (
        <div className={styles.headerMenu}>
            {/* Update buttons to Links */}
            <Link to="/" className={styles.menuButton}>Home</Link>
            <Link to="/shop" className={styles.menuButton}>Shop</Link>
            <Link to="/contact" className={styles.menuButton}>Contact</Link>
            <Link to="/affiliate" className={styles.menuAffiliate}>Become an affiliate</Link>
        </div>
    );
};

export default HeaderMenu;
