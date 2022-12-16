import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLogin } from "../../hooks/useLogin";

import "./Login.css";

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    history.push("/trade");
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="username">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
