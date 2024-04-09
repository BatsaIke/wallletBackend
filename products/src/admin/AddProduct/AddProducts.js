import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../UI/Spinner";
import ProductForm from "./ProductForm";
import { useSelector } from 'react-redux';
import { createProduct } from "../../actions/productActions";
import { set_Alert } from "../../actions/alertAction";

function AddProductForm() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.product.loading);
    const [response,setResponse]=useState()

    const handleFormSubmit = async(formData) => {
         try {
            let response =await dispatch(createProduct(formData)); 
            if (response.success===true){
                setResponse(response)
            set_Alert("Product successfully added","succes")
            }
         } catch (error) {
            
         }
    };

    if (isLoading) {
        return <Spinner />;
    }

    console.log(response?.success,"-----3254324")
    return (
        <div>
            <ProductForm onSubmit={handleFormSubmit} status={response?.success}/>
        </div>
    );
}

export default AddProductForm;
