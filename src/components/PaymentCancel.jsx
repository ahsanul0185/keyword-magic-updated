import React from 'react';

const PaymentCancel = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff', zIndex: 1, position: 'relative' }}>
    <h1 class="payment-header">❌ Payment Canceled ❌</h1>
    <p>If this wasn't intentional try again or contact support</p>
    <div className="continue-btn-container"><a className="continue-btn" href="/">Return</a></div>
  </div>
);

export default PaymentCancel;