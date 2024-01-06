// App.js
import { useEffect } from "react";
import Alert from "./components/UI/Alert";
import LeftSideBar from "./components/left-sidebare/LeftSideBar";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"; // Ensure correct import path
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import { loadUser, verifyPayment } from "./api/apiActions";
import LandingPage from "./pages/LandingPage";
import ResetPasswordComponent from "./pages/resetPassword/ResetPasswordComponent";
import ResetPassword from "./pages/resetPassword/RestPassword";
import store from "./redux/index";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
const dispatch = useDispatch()
const navigate = useNavigate()


    useEffect(() => {
      // check for token in LS when app first runs
      
        navigate('/')
      
      store.dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Alert />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute component={LandingPage} />} // Use like this
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password/:id" element={<ResetPasswordComponent />} />
        <Route path="/reset" element={<ResetPassword />} />


      </Routes>
    </>
  );
}
export default App;