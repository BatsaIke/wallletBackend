import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product, "product details");
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(product.image.url);

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  const price = product.discountPrice || product.originalPrice || product.price;
  const originalPrice = product.originalPrice || product.price;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.productImages}>
        <div className={styles.imageThumbnails}>
          <img
            src={product.image.url}
            alt={product.name}
            className={`${styles.thumbnail} ${
              mainImage === product.image.url ? styles.activeThumbnail : ""
            }`}
            onClick={() => setMainImage(product.image.url)}
          />
          {product.imageAmbiances &&
            product.imageAmbiances.length > 0 &&
            product.imageAmbiances.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Ambiance ${index + 1}`}
                className={`${styles.thumbnail} ${
                  mainImage === image.url ? styles.activeThumbnail : ""
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
        </div>
        <img src={mainImage} alt={product.name} className={styles.fullImage} />
      </div>
      <div className={styles.info}>
        <h1>{product.name}</h1>
        <div className={styles.productPrice}>
          <span>Tks: {price.toFixed(2)} ---</span>
          {product.discountPrice && (
            <span className={styles.oldPrice}>
               Tks {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className={styles.productDetails}>
          <div className={styles.productRating}>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={`fa fa-star ${
                  index < (product.averageRating || 0) ? styles.selected : ""
                }`}></span>
            ))}
            <span>
              ({product.numberOfRatings} customer review
              {product.numberOfRatings !== 1 ? "s" : ""})
            </span>
          </div>
          <div className={styles.productCategory}>
            <strong>Categories:</strong> {product.category}
          </div>
          <div className={styles.productSKU}>
            <strong>SKU:</strong> {product.sku}
          </div>
        </div>
        {product.description && <p>{product.description}</p>}
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={product.quantity <= 0}>
          <i className='fas fa-shopping-cart'></i> Add to Cart
        </button>
        {product.quantity === 0 && (
          <div className={styles.outOfStock}>Out of Stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
