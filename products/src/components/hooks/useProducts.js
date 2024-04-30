// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../actions/productActions';

// export const useProducts = (queryParams) => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector(state => state.product);

//   useEffect(() => {
//     console.log("Fetching data directly from API");
//     dispatch(fetchProducts(queryParams));
//   }, [dispatch, JSON.stringify(queryParams)]); // Serialize queryParams to ensure stable dependency

//   return { productsData: products, loading, error };
// };
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';

export const useProducts = (queryParams) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    // Check if products already exist in the store
    if (!products.length) {
      console.log("Fetching data directly from API");
      dispatch(fetchProducts(queryParams));
    }
  }, [dispatch, JSON.stringify(queryParams), products.length]); // Include products.length in dependency array

  return { productsData: products, loading, error };
};
