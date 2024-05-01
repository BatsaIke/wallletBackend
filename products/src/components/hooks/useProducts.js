import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';

export const useProducts = (queryParams) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      console.log("Fetching data directly from API");
      dispatch(fetchProducts(queryParams));
    }
  }, [dispatch, JSON.stringify(queryParams), isVisible]);

  return { productsData: products, loading, error, setIsVisible };
};
