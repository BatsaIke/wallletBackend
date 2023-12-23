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
import { loadUser } from "./api/apiActions";
import LandingPage from "./pages/LandingPage";


function App() {
const dispatch = useDispatch()
const navigate = useNavigate()


    useEffect(() => {
      // check for token in LS when app first runs
      if (localStorage.token) {
        // if there is a token set axios headers for all requests
        setAuthToken(localStorage.token);
        navigate('/')
      }
      dispatch(loadUser());
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
      </Routes>
    </>
  );
}
export default App;