import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setIsAnimating(true);
    dispatch(addItemToCart(product));
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const navigateToProductDetails = () => {
    navigate(`/productDetails/${product._id}`, { state: { product } });
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div
      className={`${styles.productCard} ${
        product.quantity === 0 ? styles.outOfStockCard : ""
      } ${isAnimating ? styles.animating : ""}`}>
      {discountPercentage > 0 && (
        <div className={styles.discount}>-{discountPercentage}%</div>
      )}
      <div onClick={navigateToProductDetails}>
        <div className={styles.imageContainer}>
          <img
            src={product.image?.url}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
      </div>
      <div className={styles.productInfo} id={product._id}>
        <h2 className={styles.productName}>{product.name}</h2>
        <div className={styles.priceContainer}>
          {product.discountPrice < product.price && (
            <span className={styles.oldPrice}>
              TKS {product.price.toFixed(2)}
            </span>
          )}
          <span className={styles.productPrice}>
            {product.discountPrice
              ? `TKS ${product.discountPrice.toFixed(2)}`
              : `TKS ${product.price.toFixed(2)}`}
          </span>
        </div>
        <p className={styles.productRating}>
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`fa fa-star ${
                index < product.averageRating ? styles.selected : ""
              }`}></span>
          ))}
        </p>
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}>
          <FaCartPlus /> Add to Cart
        </button>
        {product.quantity === 0 && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
