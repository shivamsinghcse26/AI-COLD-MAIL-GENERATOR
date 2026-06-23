import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

import { sessionCheck } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, checkingAuth, otpPending } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(sessionCheck());
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/verify-otp"
          element={otpPending ? <VerifyOtp /> : <Navigate to="/signup" />}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
