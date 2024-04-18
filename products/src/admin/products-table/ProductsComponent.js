import React, { useState, useEffect } from "react";
import styles from "./Products.module.css"; // Adjust CSS module import path
import { useSelector, useDispatch } from "react-redux";
import AddProductForm from "../AddProduct/AddProducts";
import { fetchProducts } from "../../actions/productActions";
import ProductsTable from "./ProductsTable";
import Modal from "../../UI/modal/Modal";
import Spinner from "../../UI/Spinner";

function Products() {
  const dispatch = useDispatch();
  const { products: nestedProducts, loading } = useSelector((state) => state.product);
  const products = nestedProducts.products || [];

  console.log(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductAddSuccess = () => {
    setIsModalOpen(false);
    setEditProduct(null); 
     dispatch(fetchProducts());
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setEditProduct(null); // Clear edit product when closing the modal
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product); 
    setIsModalOpen(true); 
  };

  if (loading) {
    return <Spinner />;
  }

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // You can also add logic to filter the displayed products based on searchTerm here

  return (
    <div className={styles.productsContainer}>
      <h2 className={styles.productsHeader}>Products</h2>
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button className={styles.addButton} onClick={toggleModal}>
          Add New Product
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        header={editProduct ? "Edit Product" : "Add New Product"}
        className={styles.productsModal}
      >
        <AddProductForm product={editProduct} onAddSuccess={handleProductAddSuccess} />
      </Modal>
      {products.length > 0 ? (
           <ProductsTable products={products} onEdit={handleEdit} />
      ) : (
        <p>No products Yet!</p>
      )}
    </div>
  );
}

export default Products;
