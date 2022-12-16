import React from "react";
import { useLogin } from "../hooks/useLogin";

const Header = () => {
  const { logout } = useLogin();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <header className="App-header">
        <h5>{`Can't stop, won't stop,`}</h5>
        <img
          src="https://cdn.worldvectorlogo.com/logos/gamestop.svg"
          className="App-logo"
          alt="logo"
        />
      </header>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Header;
