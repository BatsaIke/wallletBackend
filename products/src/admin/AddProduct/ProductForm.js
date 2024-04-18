import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddProductForm.module.css';
// import {useSelector}from 'react-redux'

const ProductForm = ({onSubmit, product }) => {
    const { register, handleSubmit, setValue,formState: { errors }, watch } = useForm();
    const imageFile = watch("image"); 
    // const isLoading = useSelector((state) => state.product.loading);


    const isEditing = !!product;

    const submitHandler = async (data) => {
        let productData = {
            name: data.name,
            category: data.category,
            price: data.price,
            quantity: data.quantity,
            sku: data.sku,
            image:  product?.image?.url || '',
        };

        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const base64 = await convertFileToBase64(file);
            productData.image = base64; // Update the image property with the Base64 string
        }

        // Call the onSubmit function passed as a prop, with the enriched productData
        onSubmit(productData);
    };
    
    // Convert file to Base64
    const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    console.log(product,"the product")
    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("category", product.category);
            setValue("price", product.price);
            setValue("quantity", product.quantity);
            setValue("sku", product.sku)
        }
    }, [product, setValue])

    
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
 {/* Conditionally disable SKU field for editing */}
            <div className={styles.inputGroup}>
                <label htmlFor="sku">SKU (4 digits):</label>
                <input type="text" id="sku" {...register("sku", isEditing ? {} : { required: "SKU is required", pattern: /^\d{4}$/, message: "SKU must be 4 digits" })} disabled={isEditing} />
                {errors.sku && <span className={styles.error}>{errors.sku.message}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="image">Product Image:</label>
                <input
                    type="file"
                    id="image"
                    {...register("image", {
                        required: !isEditing || !product?.image?.url ? "Product image is required" : false
                    })}
                    accept="image/png, image/jpeg"
                />
                {errors.image && <span className={styles.error}>{errors.image.message}</span>}
            </div>

            <button type="submit" className={styles.submitButton}>
                {isEditing ? "Update Product" : "Add Product"}
            </button>        </form>
    );
};

export default ProductForm;
