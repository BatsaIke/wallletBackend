import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddProductForm.module.css";

const ProductForm = ({ onSubmit, product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const imageFile = watch("image");
  const ambianceFiles = watch("imageAmbiances");

  const isEditing = !!product;

  const submitHandler = async (data) => {
    let productData = {
      name: data.name,
      category: data.category,
      originalPrice: data.originalPrice,
      discountPrice: data.discountPrice,
      quantity: data.quantity,
      sku: data.sku,
      description: data.description,
      image: product?.image?.url || "",
      imageAmbiances: product?.imageAmbiances || [],
    };

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const base64 = await convertFileToBase64(file);
      productData.image = base64;
    }

    if (
      ambianceFiles &&
      Array.isArray(ambianceFiles) &&
      ambianceFiles.length > 0
    ) {
      const ambianceImages = await Promise.all(
        Array.from(ambianceFiles).map((file) => convertFileToBase64(file))
      );
      productData.imageAmbiances = ambianceImages;
    }

    onSubmit(productData);
  };

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("originalPrice", product.originalPrice);
      setValue("discountPrice", product.discountPrice);
      setValue("quantity", product.quantity);
      setValue("sku", product.sku);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h3>{isEditing ? "Update Product" : "Add New Product"}</h3>

      <div className={styles.inputGroup}>
        <label htmlFor='name'>Product Name:</label>
        <input
          type='text'
          id='name'
          {...register("name", { required: "Product name is required" })}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='category'>Category:</label>
        <select
          id='category'
          {...register("category", { required: "Category is required" })}>
          <option value=''>Select a Category</option>
          <option value='Highs'>Highs</option>
          <option value='Bites'>Bites</option>
          <option value='Drinks'>Drinks</option>
          <option value='Accessories'>Accessories</option>
        </select>
        {errors.category && (
          <span className={styles.error}>{errors.category.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='originalPrice'>Original Price:</label>
        <input
          type='number'
          id='originalPrice'
          {...register("originalPrice", {
            required: "Original price is required",
          })}
        />
        {errors.originalPrice && (
          <span className={styles.error}>{errors.originalPrice.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='discountPrice'>Discount Price:</label>
        <input
          type='number'
          id='discountPrice'
          {...register("discountPrice")}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='quantity'>Quantity:</label>
        <input
          type='number'
          id='quantity'
          {...register("quantity", { required: "Quantity is required" })}
        />
        {errors.quantity && (
          <span className={styles.error}>{errors.quantity.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='sku'>SKU (4 digits):</label>
        <input
          type='text'
          id='sku'
          {...register(
            "sku",
            isEditing
              ? {}
              : {
                  required: "SKU is required",
                  pattern: /^\d{4}$/,
                  message: "SKU must be 4 digits",
                }
          )}
          disabled={isEditing}
        />
        {errors.sku && (
          <span className={styles.error}>{errors.sku.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          {...register("description")}
          rows='4'></textarea>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='image'>Product Image:</label>
        <input
          type='file'
          id='image'
          {...register("image", {
            required:
              !isEditing || !product?.image?.url
                ? "Product image is required"
                : false,
          })}
          accept='image/png, image/jpeg'
        />
        {errors.image && (
          <span className={styles.error}>{errors.image.message}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor='imageAmbiances'>Ambiance Images:</label>
        <input
          type='file'
          id='imageAmbiances'
          {...register("imageAmbiances")}
          accept='image/png, image/jpeg'
          multiple
        />
      </div>

      <button type='submit' className={styles.submitButton}>
        {isEditing ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
