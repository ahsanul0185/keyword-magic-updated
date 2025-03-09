import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { refreshUserData } from "./dashboard/Dashboard";
import { AuthContext } from '../contexts/AuthContext';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleContinue = async () => {
    await refreshUserData(login);
    navigate("/dashboard"); // Updated to use navigate
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', zIndex: 99, position: 'relative' }}>
      <h1 className="payment-header">✨ Thank you for using KeywordMagic! ✨</h1>
      <p>Press continue to enable the purchased plan</p>
      <div className="continue-btn-container">
        <button className="continue-btn" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
