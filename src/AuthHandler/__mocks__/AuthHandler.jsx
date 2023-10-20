const AuthHandler = ({ setLoggedIn, loggedIn = false, setLoginError }) => (
  <div>
    <button data-test="setLogout" onClick={() => setLoggedIn(false)}>
      Logout
    </button>
    <button data-test="setLoggedIn" onClick={() => setLoggedIn(true)}>
      Login
    </button>
    <button data-test="loginError" onClick={() => setLoginError(true)}>
      Error
    </button>
  </div>
);

export default AuthHandler;
