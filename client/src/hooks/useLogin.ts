import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const { setToken, removeToken } = useAuthContext();

  const login = async (username: string, password: string) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (response.ok) {
      setToken(json);
    }
  };

  const logout = () => {
    removeToken();
  };

  return { login, logout };
};
