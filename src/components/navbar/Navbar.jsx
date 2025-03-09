import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const [displayNavMenu, setDisplayNavMenu] = useState(false);
  const [isMobileView, setMobileView] = useState(window.innerWidth <= 1012);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, Subscription, username, userIdentifier } = useContext(AuthContext);

  const handleResize = () => {
    setMobileView(window.innerWidth <= 1012);
  };

  const handleNavMenuClick = () => {
    setDisplayNavMenu(!displayNavMenu);
  };

  const handleLinkClick = () => {
    if (isMobileView) {
      setDisplayNavMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubscriptionClick = () => {
    if (Subscription === "PRO") {
      window.location.href = "https://billing.stripe.com/p/login/14k4hN4LW3Gg4Ss144";
    } else {
      navigate('/#pricing');
    }
    handleLinkClick();
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    handleLinkClick(); // Close menu after navigation
  };

  const isLoginOrSignup = location.pathname === "/login" || location.pathname === "/signup";
  const isDashboard = location.pathname === "/dashboard";
  {/*<div><p class="keyword-caution" style={{ marginTop: 0}}>Server maintenance in progress, interruptions possible</p></div>*/}
  return (
    <div className="navbar" data-aos="fade-down" data-aos-once="true">
      <Link to="/" className="nav-left" onClick={handleLinkClick}>
        {!isLoggedIn ? (
          <p className="nav-logo">KeywordMagic✨</p>
        ) : (
            <p className="hello-head">
            Hello <span>{username}!</span>
          </p>
        )}
        <svg
          width="30"
          height="32"
          viewBox="0 0 35 38"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          {/* SVG path data here */}
        </svg>
      </Link>
      <div className="log-menu-wrapper">
        <ul className="mobile-login-btn">
          {!isLoggedIn ? (
            !isLoginOrSignup && (
              <li className="log-in-out-wrapper">
                <Link to={isLoginOrSignup ? "#" : "/signup"} className="log-in-out-btn" onClick={handleLinkClick}>
                  {isLoginOrSignup ? "" : "Free Trial"}
                </Link>
              </li>
            )
          ) : (
            <>
              <li className={`log-in-out-wrapper ${isMobileView ? "mobile-hidden" : ""}`}>
                {isDashboard ? (
                  <a onClick={() => { logout(); handleLinkClick(); }} className="log-in-out-btn">
                    Log Out
                  </a>
                ) : (
                  <a onClick={() => { handleDashboardClick(); handleLinkClick(); }} className="log-in-out-btn">
                    Dashboard
                  </a>
                )}
              </li>
              <li className={`credits-wrapper ${isMobileView ? "mobile-visible" : ""}`}>
              <a href={Subscription === "PRO" ? "https://billing.stripe.com/p/login/14k4hN4LW3Gg4Ss144" : "#pricing"} onClick={handleLinkClick}>Plan: {Subscription}</a>
                <p className="user-id">ID: {userIdentifier}</p>
              </li>
            </>
          )}
        </ul>
        {!isLoginOrSignup && (
          <div className="nav-menu-dots" onClick={handleNavMenuClick}>
            <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 128 512">
              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
            </svg>
          </div>
        )}
      </div>
      <div className={`menu ${isMobileView ? "mobile" : ""} ${displayNavMenu ? "visible" : ""} nav-links`}>
        {!isLoggedIn ? (
          <ul>
            {!isLoginOrSignup && (
              <>
                <li onClick={handleLinkClick}>
                  <a href="#data">Data Source</a>
                </li>
                <li onClick={handleLinkClick}>
                <a href="#pricing">Pricing</a>
                </li>
                <li onClick={handleLinkClick}>
                  <a href="/login">Log In</a>
                </li>
                <li className="log-in-out-wrapper pc-login-btn" onClick={handleLinkClick}>
                  <Link to="/signup" className="log-in-out-btn">Free Trial</Link>
                </li>
              </>
            )}
          </ul>
        ) : (
          <ul>
            {!isMobileView ? (
              <>
                <li>
                  <a href="#pricing" onClick={handleSubscriptionClick}>Plan: {Subscription}</a>
                  <p className="user-id">ID: {userIdentifier}</p>
                </li>
                <li className="log-in-out-wrapper pc-login-btn">
                  {isDashboard ? (
                    <a onClick={() => { logout(); handleLinkClick(); }} className="log-in-out-btn">
                      Log Out
                    </a>
                  ) : (
                    <a onClick={() => { handleDashboardClick(); handleLinkClick(); }} className="log-in-out-btn">
                      Dashboard
                    </a>
                  )}
                </li>
              </>
            ) : (
              <>
                <li className="log-in-out-wrapper">
                  {isDashboard ? (
                    <a onClick={() => { logout(); handleLinkClick(); }} className="log-in-out-btn">
                      Log Out
                    </a>
                  ) : (
                    <a onClick={() => { handleDashboardClick(); handleLinkClick(); }} className="log-in-out-btn">
                      Dashboard
                    </a>
                  )}
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;