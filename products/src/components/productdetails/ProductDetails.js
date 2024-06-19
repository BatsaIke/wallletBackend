import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product, "product details");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <img
        src={product.image.url}
        alt={product.name}
        className={styles.fullImage}
      />
      <div className={styles.info}>
        <h2>{product.name}</h2>
        {product.description && <p>{product.description}</p>}
        <p>Category: {product.category}</p>
        <p>Price: TKS: {product.price.toFixed(2)}</p>
        {product.rating && (
          <p>
            Rating:{" "}
            {Array.from({ length: 5 }, (v, i) => (
              <span
                key={i}
                className={
                  i < product.rating ? styles.starFilled : styles.star
                }>
                &#9733;
              </span>
            ))}
          </p>
        )}
        {product.imageAmbiances && product.imageAmbiances.length > 0 && (
          <div className={styles.ambiances}>
            <h3>Ambiance Images</h3>
            <div className={styles.ambianceImages}>
              {product.imageAmbiances.map((ambiance, index) => (
                <img
                  key={index}
                  src={ambiance.url}
                  alt={`Ambiance ${index + 1}`}
                  className={styles.ambianceImage}
                />
              ))}
            </div>
          </div>
        )}
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
