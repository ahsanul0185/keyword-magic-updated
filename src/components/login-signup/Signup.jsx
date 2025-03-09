import React, { useRef, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import Turnstile from "react-turnstile";

const provider = new GoogleAuthProvider();

function Signup() {
  const turnstileRef = useRef();
  const { isLoggedIn, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const isNameValid = (name) => /^[A-Za-z]{2,12}$/.test(name);

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":-{}|<>]/.test(password)
    );
  };

  const getCustomErrorMessage = (code) => {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email',
      'auth/user-disabled': 'Account disabled',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Invalid credentials',
      'auth/invalid-credential': 'Invalid credentials',
      'auth/email-already-in-use': 'User already exists',
      'auth/weak-password': 'Password too weak',
      'auth/too-many-requests': 'Too many requests',
      'auth/operation-not-allowed': 'Not allowed',
      'auth/network-request-failed': 'Network error',
      'auth/internal-error': 'Internal error',
      'auth/missing-email': 'Email missing'
    };
    return errorMessages[code] || code;
  };

  const generateUserIdentifier = () => {
    const timestamp = Date.now().toString(36).slice(-4);
    const randomChars = Math.random().toString(36).substr(2, 4);
    return (timestamp + randomChars).toUpperCase();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name) {
      setError("Name required");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!isNameValid(name)) {
      setError("Invalid name");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (email.length > 64) {
      setError("Email invalid");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (password.length > 64) {
      setError("Password invalid");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!email) {
      setError("Email required");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!password) {
      setError("Password required");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!isPasswordValid(password)) {
      setError("Password must be at least 8 characters long, include one uppercase letter, one symbol, and one number.");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!confirmPassword) {
      setError("Confirm password.");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      turnstileRef.current.reset();
      return;
    }

    if (!captchaValue) {
      setError("Complete the CAPTCHA");
      setLoading(false);
      return;
    } else {
      const res = await fetch('https://api.keywordmagic.io/turnstile', {
        method: 'POST',
        body: JSON.stringify({ captchaValue }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userIdentifier = generateUserIdentifier();

          const response = await fetch(`https://api.keywordmagic.io/create_new_user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uid: user.uid,
              displayName: name,
              email: user.email,
              userIdentifier: userIdentifier
            })
          });

          const data = await response.json();
          if (response.ok) {
            login({ username: name, Subscription: 'Trial', userIdentifier: userIdentifier, UID: user.uid });
            navigate('/dashboard');
          } else {
            setError(data.error || 'User already exists');
            setLoading(false);
          }
        } catch (error) {
          setError(getCustomErrorMessage(error.code));
        } finally {
          setLoading(false);
        }
      } else {
        setError("CAPTCHA validation failed");
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userIdentifier = generateUserIdentifier();

      const response = await fetch(`https://api.keywordmagic.io/create_new_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user.uid,
          displayName: user.displayName || user.email,
          email: user.email,
          userIdentifier: userIdentifier
        })
      });

      const data = await response.json();
      if (response.ok) {
        login({ username: user.displayName || user.email, userIdentifier: userIdentifier, Subscription: 'Trial', UID: user.uid });
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setError(getCustomErrorMessage(error.code));
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="log-wrapper">
      <div className="log-container">
        <p className="log-heading">Sign Up</p>
        {error && <p className="log-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="log-input-label-container">
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="signup-name">
                Name
              </label>
              <br />
              <input
                className="log-input"
                id="signup-name"
                type="text"
                maxLength="12"
                placeholder="Type your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="signup-email">
                Email
              </label>
              <br />
              <input
                className="log-input"
                id="signup-email"
                type="email"
                maxLength="64"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="signup-pass">
                Password
              </label>
              <br />
              <input
                className="log-input"
                id="signup-pass"
                type="password"
                maxLength="64"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="signup-pass-repeat">
                Repeat Password
              </label>
              <br />
              <input
                className="log-input"
                id="signup-pass-repeat"
                type="password"
                maxLength="64"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="turnstile">
              <Turnstile
                ref={turnstileRef}
                sitekey="0x4AAAAAAAgvt06fnnyRjTID"
                onVerify={onCaptchaChange}
              />
            </div>
            <div className="log-start-container">
              <button className="log-start-btn log-sign-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Get Started"}
              </button>
            </div>
            <div className="log-start-container">
              <button
                className="log-start-btn g-sign-log"
                type="button"
                onClick={handleGoogleSignIn}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_25_168)">
                    <path
                      d="M19.222 14.2091H12.9902V10.0881H23.8474C23.9621 10.8093 24.0163 11.5442 24.0163 12.2765C24.0163 15.8281 22.7614 18.8183 20.592 20.854H17.0733V18.2381C18.3349 17.3599 19.195 16.0163 19.468 14.5035L19.5211 14.2091H19.222Z"
                      fill="#4285F4"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M12.7401 24.0008C15.9766 24.0008 18.7059 22.9382 20.6945 21.1039L16.8276 18.1055C15.7517 18.8375 14.3627 19.252 12.7445 19.252C9.61388 19.252 6.95946 17.1399 6.00705 14.3003H2.0166V17.3912C4.05371 21.4434 8.2029 24.0008 12.7401 24.0008Z"
                      fill="#34A853"
                    />
                    <path
                      d="M6.00277 14.3002C5.50011 12.8099 5.50011 11.196 6.00277 9.70569V6.61475H2.01674C0.314734 10.0055 0.314734 14.0004 2.01674 17.3912L6.00277 14.3002Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M12.7401 4.74966C14.4509 4.7232 16.1044 5.36697 17.3434 6.54867L20.7695 3.12262C18.6001 1.0855 15.7208 -0.034466 12.7401 0.000808666C8.2029 0.000808666 4.05371 2.55822 2.0166 6.61481L6.00264 9.70575C6.95064 6.86173 9.60947 4.74966 12.7401 4.74966Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_25_168">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Sign Up with Google
              </button>
            </div>
            <p className="dont-have-acc">
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <p className="dont-have-acc">
             By creating an account you agree to our <Link to="/legal#termsconditions">Terms & Conditions</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;