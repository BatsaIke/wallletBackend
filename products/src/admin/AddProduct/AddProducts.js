import React from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../UI/Spinner";
import ProductForm from "./ProductForm";
import { useSelector } from 'react-redux';
import { createProduct, updateAProduct, } from "../../actions/productActions";
import { set_Alert } from "../../actions/alertAction";

function AddProductForm({product, onAddSuccess }) {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.product.loading);
    
    
    const handleFormSubmit = async(formData) => {
        try {
            let response;
            if (product) {
                // If we're editing an existing product, call the updateProduct action
                response = await dispatch(updateAProduct(product._id, formData));
            } else {
                // If we're adding a new product, call the createProduct action
                response = await dispatch(createProduct(formData));
            }

            if (response.success) {
                set_Alert(product ? "Product successfully updated" : "Product successfully added", "success");
                if(onAddSuccess) {
                    onAddSuccess(); // Call the success callback
                }
            }
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <ProductForm onSubmit={handleFormSubmit} product={product} />
        </div>
    );
}

export default AddProductForm;
