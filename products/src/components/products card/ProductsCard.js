import React from 'react';
import { FaCartPlus } from 'react-icons/fa'; // Import the add to cart icon
import styles from './ProductCard.module.css'; // Assume you have this CSS module for styling
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/slices/cartSlice'; // Adjust the import path as necessary

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Dispatch the action with the product object
        dispatch(addItemToCart(product));
    };

    return (
        <div className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.details}>
                <h3>{product.name}</h3> {/* Display product name */}
                <p>Category: {product.category}</p>
                <p>Price: TKS {product.price.toFixed(2)}</p>
                <p>Quantity: {product.quantity}</p>
                <button className={styles.addToCartButton} onClick={handleAddToCart}>
                    <FaCartPlus /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
