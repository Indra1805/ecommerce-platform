import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  logoutUser,
  setAccessToken,
  clearAccessToken,
  refreshAccessToken,
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [loading, setLoading] = useState(true);

  // 🔄 Silent refresh (non-blocking)
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setAccessToken(data.access);

    localStorage.setItem("username", credentials.username);
    setUser(credentials.username);
    setAuthenticated(true);
  };

  const logout = async () => {
    try {
      console.log("LOGOUT FUNCTION CALLED");
      await logoutUser(); // 🔥 clears refresh cookie
    } catch {
      // even if backend fails, proceed
    }

    clearAccessToken();
    localStorage.removeItem("username");

    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        login,
        logout,
        loading, // exposed if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
