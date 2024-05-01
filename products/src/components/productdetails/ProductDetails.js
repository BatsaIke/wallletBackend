import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product; 
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart(product));
    };

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className={styles.detailsContainer}>
            <img src={product.image.url} alt={product.name} className={styles.fullImage} />
            <div className={styles.info}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Price: TKS: {product.price.toFixed(2)}</p>
                <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={product.quantity <= 0}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
