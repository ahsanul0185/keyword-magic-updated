import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BodyWrapper from "./components/body-wrapper/BodyWrapper";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Trends from "./components/dashboard/Trends";
import Footer from "./components/footer/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import Legal from "./components/legal/Legal";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import AuthProvider from './contexts/AuthContext';
import NotFound from "./components/NotFound";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <BodyWrapper>
          <Navbar login={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentcancel" element={<PaymentCancel />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="" element={<Dashboard />} />
              <Route path="trends" element={<Trends />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BodyWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
