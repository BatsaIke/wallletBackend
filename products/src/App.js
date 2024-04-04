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


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Set auth token header auth
      dispatch(getLoginUser()); // Attempt to fetch user
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
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/affiliate" element={<AffiliatePage />} />
        <Route path="/contact" element={<ContactPage />} />





        </Routes>
    </div>
    </>
  );
}

export default App;
