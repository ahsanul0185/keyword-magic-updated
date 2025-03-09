import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UID, setUID] = useState("");
  const [Subscription, setSubscription] = useState("");
  const [username, setUsername] = useState("");
  const [userIdentifier, setUserIdentifier] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      setIsLoggedIn(true);
      setUID(user.UID);
      setSubscription(user.Subscription);
      setUsername(user.username);
      setUserIdentifier(user.userIdentifier);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false); // Authentication check is done
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUID(user.UID);
    setSubscription(user.Subscription);
    setUsername(user.username);
    setUserIdentifier(user.userIdentifier);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUID("");
    setSubscription("");
    setUsername("");
    setUserIdentifier("");
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, Subscription, username, userIdentifier, UID, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;