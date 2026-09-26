import {
  createContext,
  useContext,
  useState,
} from "react";

import { loginUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // =====================================================
  // Restore user
  // =====================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error(
        "خطأ في قراءة بيانات المستخدم:",
        error
      );

      localStorage.removeItem("user");

      return null;
    }
  });

  // =====================================================
  // Restore token
  // =====================================================

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // Pending provider approval
  // =====================================================

  const [pendingApproval, setPendingApproval] = useState(
    () => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return false;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        return (
          parsedUser.role === "provider" &&
          parsedUser.isApproved === false
        );
      } catch {
        return false;
      }
    }
  );

  // =====================================================
  // Login
  // =====================================================

  const login = async (email, password) => {
    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      // -----------------------------------------------
      // Save session
      // -----------------------------------------------

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // -----------------------------------------------
      // Update Context
      // -----------------------------------------------

      setToken(data.token);

      setUser(data.user);

      setPendingApproval(
        data.user?.role === "provider" &&
          data.user?.isApproved === false
      );

      return data;
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Logout
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setPendingApproval(false);
  };

  // =====================================================
  // User helpers
  // =====================================================

  const isAuthenticated = Boolean(
    user && token
  );

  const isProvider =
    user?.role === "provider";

  const isAdmin =
    user?.role === "admin" ||
    user?.isAdmin === true;

  const serviceType =
    user?.serviceType || null;

  // =====================================================
  // Provider type helpers
  // =====================================================

  const isHallProvider =
    isProvider &&
    serviceType === "hall";

  const isBeautyProvider =
    isProvider &&
    serviceType === "beauty";

  const isBridalDressesProvider =
    isProvider &&
    serviceType === "bridal-dresses";

  const isGroomSuitsProvider =
    isProvider &&
    serviceType === "groom-suits";

  const isPhotographerProvider =
    isProvider &&
    serviceType === "photographers";

  const isWeddingCarsProvider =
    isProvider &&
    serviceType === "wedding-cars";

  // =====================================================
  // Context
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        pendingApproval,

        // Authentication
        isAuthenticated,
        isProvider,
        isAdmin,

        // Provider
        serviceType,

        isHallProvider,
        isBeautyProvider,
        isBridalDressesProvider,
        isGroomSuitsProvider,
        isPhotographerProvider,
        isWeddingCarsProvider,

        // Actions
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// Hook
// =====================================================

export const useAuth = () => {
  return useContext(AuthContext);
};