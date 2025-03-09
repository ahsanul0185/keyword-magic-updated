import React, { useState, useContext, useCallback } from "react";
import "./style.css";
import "./PricingSlider.css";
import check from "../../assets/check-check.svg";
import Slider from "react-slick";
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Arrow = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
);

export const Pricing = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleModalToggle = () => setModalVisible(!modalVisible);

  const licenseKeyRegex = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;

  const handleLicenseKeySubmit = async () => {
    if (!licenseKeyRegex.test(licenseKey)) {
      setError("Invalid license key");
    } else {
      setError("");
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.UID) {
        return;
      }
      if (!user?.UID || user.Subscription === 'PRO') {
        setError("Subscription is already PRO");
        return;
      }
      setLoading(true);
      try {
        const apiUrl = 'https://api.keywordmagic.io/license';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.UID, licenseKey })
        });
        if (!response.ok) throw new Error('Failed to validate license key');
        const data = await response.json();
        if (data.success) {
          window.location.href = "https://www.keywordmagic.io/paymentsuccess";
        } else {
          setError("License activation failed");
        }
      } catch (error) {
        console.error('Error during license key validation:', error);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };  

  const handlePayment = useCallback(async (price, index) => {
    if (!isLoggedIn) {
      navigate("/signup");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.UID) {
      console.error("User ID not found in local storage.");
      return;
    }

    const apiUrl = 'https://api.keywordmagic.io/create_checkout_session';
    const body = {
      userId: user.UID,
      price,
      successUrl: `${window.location.origin}/paymentsuccess`,
      cancelUrl: `${window.location.origin}/paymentcancel`
    };

    try {
      setLoading(index);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const data = await response.json();
      const stripe = window.Stripe('pk_live_51PdbTfCmCZBc6oTztmBIq2INAFYOtOd3F8hD7VlFdrKDHyaD5qMpGdVZXAUmC3Sr3tvVLmGdJBcHhl16lCe94FoZ00fGxSBrpK');
      await stripe.redirectToCheckout({ sessionId: data.id });

    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(null);
    }
  }, [isLoggedIn, navigate]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      { breakpoint: 860, settings: { slidesToShow: 1, centerMode: true } },
      { breakpoint: 550, settings: { slidesToShow: 1, centerMode: false, className: "" } }
    ],
  };

  const plans = [
    { title: 'Weekly ⭐️', description: 'Charged once a week', price: 10, btnClass: 'card-btn-basic', bonus: 'Minimal commitment', popular: false },
    { title: 'Monthly 🌟', description: 'Charged once a month', price: 25, btnClass: 'card-btn-premium', bonus: 'Save $15', popular: true },
    { title: 'Annual ✨', description: 'Charged once a year', price: 275, btnClass: 'card-btn-basic', bonus: 'Save $25', popular: false }
  ];

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <h2 className="secondary-heading">Choose Your Plan</h2>
        <p id="pricing" className="secondary-description">
          <a href="/legal#FairUsage" style={{ textDecoration: 'underline', color: 'inherit' }}>Fair usage</a> terms and conditions apply for each plan. Result amount subject to data availability.
        </p>
        <div className="card-container">
          {plans.map((plan, index) => (
            <div key={index} className="single-card" data-aos="fade-up" data-aos-delay={index * 300} data-aos-once="true">
              {plan.title && <p className="card-heading">{plan.title}</p>}
              <p className="card-description">{plan.description}</p>
              <p className="Price-credit">Unlimited</p>
              <p className="price">${plan.price}</p>
              <button
                className={plan.btnClass}
                onClick={() => handlePayment(plan.price, index)}
                disabled={loading === index}
              >
                {loading === index ? 'Loading...' : 'Get Started'}
              </button>
              {plan.popular && <div className="popular-card-tag"><b>Popular</b></div>}
              <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">{plan.bonus}</p></div>
              <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">AI Insight tool</p></div>
              <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">Advanced keyword tool</p></div>
            </div>
          ))}
        </div>
        <div className="price-card-mobile-container">
          <Slider {...settings}>
            {plans.map((plan, index) => (
              <div key={index} className="single-card" data-aos="fade-up" data-aos-delay={index * 300} data-aos-once="true">
                {plan.title && <p className="card-heading">{plan.title}</p>}
                <p className="card-description">{plan.description}</p>
                <p className="Price-credit">Unlimited</p>
                <p className="price">${plan.price}</p>
                <button
                  className={plan.btnClass}
                  onClick={() => handlePayment(plan.price, index)}
                  disabled={loading === index}
                >
                  {loading === index ? 'Loading...' : 'Get Started'}
                </button>
                {plan.popular && <div className="popular-card-tag"><b>Popular</b></div>}
                <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">{plan.bonus}</p></div>
                <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">AI Insight tool</p></div>
                <div className="check-container"><img src={check} alt="Checkmark" /><p className="check-description">Advanced keyword tool</p></div>
              </div>
            ))}
          </Slider>
        </div>
        <p className="secondary-description license-link">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              if (!isLoggedIn) {
                navigate("/signup");
              } else {
                handleModalToggle();
              }
            }}
            style={{ textDecoration: 'underline', color: 'inherit' }}
          >
            I have a license key
          </a>
        </p>
        {modalVisible && (
          <div className="license-modal-overlay" onClick={handleModalToggle}>
            <div className="license-modal" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                placeholder="XXX-XXX-XXX-XXX"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                className="license-input"
              />
              {error && <p className="error-message">{error}</p>}
              <button onClick={handleLicenseKeySubmit} disabled={!licenseKey.trim()} className="card-btn-basic">{loading ? 'Loading...' : 'Activate'}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;