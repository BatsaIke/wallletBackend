import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate= useNavigate()    
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddToCart = () => {
        setIsAnimating(true);
        dispatch(addItemToCart(product));
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    } 

    const navigateToProductDetails = () => {
        navigate(`/productDetails/${product._id}`, { state: { product } });
      };

    let displayQuantity;
    if (product.quantity > 1) {
        displayQuantity = 'Available';
    } else if (product.quantity === 1) {
        displayQuantity = 1;
    } else {
        displayQuantity = 'Out of Stock';
    }

    return (
        <div className={`${styles.card} ${isAnimating ? styles.animating : ''}`}
        >
            <div onClick={navigateToProductDetails}>
            <div className={styles.imageContainer}>
                <img src={product.image?.url} alt={product.name} className={styles.image} />
            </div>
            </div>
            <div className={styles.details} id={product._id}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: TKS {product.price.toFixed(2)}</p>
                <p className={product.quantity <= 0 ? styles.outOfStock : ''}>Quantity: {displayQuantity}</p>
                
                <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                    disabled={product.quantity <= 0}
                >
                    <FaCartPlus /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
