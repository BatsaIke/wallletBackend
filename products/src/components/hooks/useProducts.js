import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';
import { setProducts } from '../../redux/slices/productsSlice';

export const useProducts = (queryParams) => {
  const dispatch = useDispatch();
  const { products, loading, error, totalPages } = useSelector(state => state.product);

  useEffect(() => {
    console.log("using cashed")
    const cacheKey = 'products';
    const cachedData = localStorage.getItem(cacheKey);
    const isDataStale = true; // Implement a check to see if data needs refresh

    if (cachedData && !isDataStale) {
      const cachedProducts = JSON.parse(cachedData);
      if (cachedProducts.timestamp > Date.now() - 3600000) { // Cache for 1 hour
        dispatch(setProducts(cachedProducts.Data));
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }

    function fetchData() {
      dispatch(fetchProducts(queryParams)).then((response) => {
        localStorage.setItem(cacheKey, JSON.stringify({ data: response.payload, timestamp: Date.now() }));
      });
    }
  }, [dispatch, queryParams]); // Serialize queryParams to stabilize dependencies

  return { productsData: products, loading, error, totalPages };
};
