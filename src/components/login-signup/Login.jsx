import React, { useRef, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import Turnstile from "react-turnstile";

const provider = new GoogleAuthProvider();

function Login() {
  const turnstileRef = useRef();
  const { isLoggedIn, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!password) {
      setError("Enter password");
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
        })
        const data = await res.json()
        if (data.success) {
          try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid), { source: 'server' });
            if (userDoc.exists()) {
              const userData = userDoc.data();
              login({ username: userData.displayName, Subscription: userData.Subscription, userIdentifier: userData.userIdentifier, UID: user.uid });
            }
            navigate('/dashboard');
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

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid), { source: 'server' });
      if (userDoc.exists()) {
        const userData = userDoc.data();
        login({ username: userData.displayName, Subscription: userData.Subscription, userIdentifier: userData.userIdentifier, UID: user.uid });
      }

      navigate('/dashboard');
    } catch (error) {
      setError(getCustomErrorMessage(error.code));
    }
  };

  const handlePasswordReset = async () => {
    if (!captchaValue) {
      setError("Complete the CAPTCHA");
      return;
    }

    if (!email) {
      setError("Email required");
      turnstileRef.current.reset();
      return;
    }

    const res = await fetch('https://api.keywordmagic.io/turnstile', {
      method: 'POST',
      body: JSON.stringify({ captchaValue }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const data = await res.json();
    if (!data.success) {
      setError('CAPTCHA validation failed');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Email sent if such user exists");
    } catch (error) {
      setError(getCustomErrorMessage(error.code));
    }
  };

  const onCaptchaChange = (token) => {
    setCaptchaValue(token);
  };

  return (
    <div className="log-wrapper">
      <div className="log-container">
        <p className="log-heading">Log in to your account</p>
        <p className="log-description">Welcome back! Please enter your details.</p>
        {error && <p className="log-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="log-input-label-container">
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="login-email">
                Email
              </label>
              <br />
              <input
                className="log-input"
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="log-input-label-single-container">
              <label className="log-label" htmlFor="login-pass">
                Password
              </label>
              <br />
              <input
                className="log-input"
                id="login-pass"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="forget-pass" onClick={handlePasswordReset} style={{ cursor: 'pointer' }}>Reset password</p>
            <div className="turnstile">
              <Turnstile
                ref={turnstileRef}
                sitekey="0x4AAAAAAAgvt06fnnyRjTID" // Replace with your Cloudflare Turnstile site key
                onVerify={onCaptchaChange}
              />
            </div>
            <div className="log-start-container">
            <button className="log-start-btn log-sign-btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
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
                Log in with Google
              </button>
            </div>
            <p className="dont-have-acc">
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
