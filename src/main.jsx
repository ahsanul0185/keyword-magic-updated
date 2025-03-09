import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppProvider from "./store/ContextProvider.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
