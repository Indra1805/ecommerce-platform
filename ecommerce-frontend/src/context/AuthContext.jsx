// context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  fetchMe,
  registerUser,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ SILENT BOOTSTRAP
  useEffect(() => {
    const init = async () => {
      try {
        const access = await refreshAccessToken();
        const me = await fetchMe(access);

        setUser(me);
        setIsAuthenticated(true);
      } catch {
        // 🔥 THIS IS NORMAL FOR GUEST USERS
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const register = async (data) => {
    await registerUser(data);
  };

  const login = async (cred) => {
    const data = await loginUser(cred);
    const me = await fetchMe(data.access);

    setUser(me);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
