import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa'; // Import the add to cart icon
import styles from './ProductCard.module.css'; // Assume you have this CSS module for styling
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice'; // Adjust the import path as necessary

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAddToCart = () => {
        setIsAnimating(true);
        dispatch(addItemToCart(product));
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000); // Adjust the duration to match your animation
    }
    let displayQuantity;
    if (product.quantity > 1) {
        displayQuantity = 'Available';
    } else if (product.quantity === 1) {
        displayQuantity = 1;
    } else {
        displayQuantity = 'Out of Stock';
    }

    return (
        <div className={`${styles.card} ${isAnimating ? styles.animating : ''}`}>
            <img src={product.image?.url} alt={product.name} className={styles.image} />
            <div className={styles.details} id={product._id}>
                <h3>{product.name}</h3> {/* Display product name */}
                <p>Category: {product.category}</p>
                <p>Price: TKS {product.price.toFixed(2)}</p>
                <p>Quantity: {displayQuantity}</p>
                <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                    disabled={product.quantity <= 0} // Disable button if product is out of stock
                >
                    <FaCartPlus /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
