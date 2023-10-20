import React, { useState } from "react";
import AuthHandler from "./AuthHandler/AuthHandler";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  return (
    <div className="login-container">
      <AuthHandler
        setLoginError={setLoginError}
        isLoggedIn={isLoggedIn}
        setLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}
