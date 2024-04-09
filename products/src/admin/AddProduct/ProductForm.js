import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddProductForm.module.css';
import {useSelector}from 'react-redux'

const ProductForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const imageFile = watch("image"); 
    const isLoading = useSelector((state) => state.product.loading);
    console.log(isLoading,"loading")

    const submitHandler = async (data) => {
        let productData = {
            name: data.name,
            category: data.category,
            price: data.price,
            quantity: data.quantity,
            sku: data.sku,
            // Initialize image with an empty string; it will be replaced if an image is provided
            image: '',
        };
    
        // Convert image to Base64 and update productData if present
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            try {
                const base64 = await convertFileToBase64(file);
                productData.image = base64;
            } catch (error) {
                console.error("Error converting file to Base64:", error);
            }
        }
    
        // At this point, productData is fully prepared with all necessary fields, including the Base64 encoded image
        onSubmit(productData);
    };
    
    // Convert file to Base64
    const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
            <h3>Add New Product</h3>

            <div className={styles.inputGroup}>
                <label htmlFor="name">Product Name:</label>
                <input type="text" id="name" {...register("name", { required: "Product name is required" })} />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="category">Category:</label>
                <select id="category" {...register("category", { required: "Category is required" })}>
                    <option value="">Select a Category</option>
                    <option value="Flowers">Flowers</option>
                    <option value="Edibles">Edibles</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Accessories">Accessories</option>
                </select>
                {errors.category && <span className={styles.error}>{errors.category.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" {...register("price", { required: "Price is required" })} />
                {errors.price && <span className={styles.error}>{errors.price.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="quantity">Quantity:</label>
                <input type="number" id="quantity" {...register("quantity", { required: "Quantity is required" })} />
                {errors.quantity && <span className={styles.error}>{errors.quantity.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="sku">SKU (4 digits):</label>
                <input type="text" id="sku" {...register("sku", { required: "SKU is required", pattern: /^\d{4}$/, message: "SKU must be 4 digits" })} />
                {errors.sku && <span className={styles.error}>{errors.sku.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="image">Product Image:</label>
                <input type="file" id="image" {...register("image", { required: "Product image is required" })} accept="image/png, image/jpeg" />
                {errors.image && <span className={styles.error}>{errors.image.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>Add Product</button>
        </form>
    );
};

export default ProductForm;
