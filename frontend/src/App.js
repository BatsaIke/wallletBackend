import { useEffect } from "react";
import Alert from "./components/UI/Alert";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./api/apiActions";
import LandingPage from "./pages/LandingPage";
import ResetPasswordComponent from "./pages/resetPassword/ResetPasswordComponent";
import ResetPassword from "./pages/resetPassword/RestPassword";
import store from "./redux/index";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    } 
    store.dispatch(loadUser());

  }, [dispatch, navigate]);

  return (
    <>
      <Alert />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute component={LandingPage} />}
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
