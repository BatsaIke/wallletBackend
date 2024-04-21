import './App.css';
import { Route, Routes,  } from 'react-router-dom';
import Header from './components/header/header component/Header';
import Homepage from './components/home products/Homepage';
import CartPage from './components/cart/CartPage';
import LoginPage from './pages/Login/Loginpage';
import Alert from './UI/alert/Alert';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { getLoginUser } from './actions/authAction';
import CheckoutPage from './components/checkout/Checkoutpage';
import ShopPage from './pages/shop/ShopPage';
import AffiliatePage from './pages/affiliate/Affiliate';
import ContactPage from './pages/contact us/Contact';


import SignupPage from './pages/signup/SignupPage';
import AdminLayout from './admin/AdminLayout';
import AddProductForm from './admin/AddProduct/AddProducts';
import Products from './admin/products-table/ProductsComponent';
import OrderDetailsComponent from './admin/orders/order-details/OrderDetailsComponent';
import OrdersComponent from './admin/orders/orders-table/OrdersComponent';
import PrivateRoute from './components/PrivateRoute';
import { createOrder } from './actions/orderActions';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Set auth token header auth
      dispatch(getLoginUser());
    }

    // Check for stored order data and reference
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));
    const storedReference = localStorage.getItem('reference');

    if (storedOrderData && storedReference) {
      const createOrderFromStorage = async () => {
        const orderResult = await dispatch(createOrder(storedOrderData));
        if (orderResult.success) {
          localStorage.removeItem('orderData');
          localStorage.removeItem('reference');
          console.log("Order created successfully from stored data.");
        } else {
          console.error("Failed to create order from stored data.");
        }
      };
      createOrderFromStorage();
    }
  }, [dispatch]);


  return (
    <>
   
    <Header/>
    <Alert/>
    <div className="container">
    
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/contact" element={<ContactPage />} />

<Route path="/admin/*" element={<AdminLayout />}>
            
            <Route element={<PrivateRoute  />}>
            <Route path="addproducts" element={<AddProductForm />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<OrdersComponent />} />
            <Route path="orderdetails/:orderId" element={<OrderDetailsComponent />} />
            </Route>


            <Route element={<PrivateRoute allowedRoles={['mederator']} />}>
            <Route path="orders" element={<OrdersComponent />} />
            <Route path="orderdetails/:orderId" element={<OrderDetailsComponent />} />
            </Route>

          </Route>

        </Routes>
    </div>
    </>
  );
}

export default App;

