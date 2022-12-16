import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";
import Header from "./scopes/Header";

import "./App.css";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
import Trade from "./scopes/Trade/Trade";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch("http://localhost:4242/hello")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {user?.token && <Route path="/trade" component={Trade}></Route>}
          <Route path="*" exact>
            <h1>
              API:
              {connected === true && " connected"}
              {connected === false && " not connected"}
            </h1>
            <Link className="login" to="/login">
              Login
            </Link>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AuthProvider>
    <OrderProvider>
      <App />
    </OrderProvider>
  </AuthProvider>
);

export default WrappedApp;
