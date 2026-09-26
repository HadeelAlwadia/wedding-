
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getProviderBusiness,
  getProviderConfig,
} from "../api/providerApi";

const ProviderContext = createContext(null);

// =========================================================
// Provider Context Provider
// =========================================================

export const ProviderContextProvider = ({
  children,
}) => {
  const [business, setBusiness] = useState(null);
  const [config, setConfig] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =======================================================
  // Load Provider Data
  // =======================================================

  const loadProviderData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        businessResponse,
        configResponse,
      ] = await Promise.all([
        getProviderBusiness(),
        getProviderConfig(),
      ]);

      setBusiness(
        businessResponse?.business || null
      );

      setConfig(
        configResponse || null
      );
    } catch (error) {
      console.error(
        "Provider data error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "حدث خطأ أثناء تحميل بيانات مزود الخدمة"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // =======================================================
  // Initial Load
  // =======================================================

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const user =
      localStorage.getItem("user");

    // لا نحاول جلب بيانات Provider
    // إذا لم يكن المستخدم مسجل دخول
    if (!token || !user) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser =
        JSON.parse(user);

      // فقط Provider
      if (parsedUser?.role !== "provider") {
        setLoading(false);
        return;
      }

      loadProviderData();
    } catch (error) {
      console.error(
        "Invalid user data:",
        error
      );

      setLoading(false);
    }
  }, [loadProviderData]);

  // =======================================================
  // Refresh Provider Data
  // =======================================================

  const refreshProvider = useCallback(
    async () => {
      await loadProviderData();
    },
    [loadProviderData]
  );

  // =======================================================
  // Update Business Locally
  // =======================================================

  const updateBusinessState = useCallback(
    (updatedBusiness) => {
      setBusiness(updatedBusiness);
    },
    []
  );

  // =======================================================
  // Context Value
  // =======================================================

  const value = {
    business,
    config,

    loading,
    error,

    refreshProvider,
    updateBusinessState,
  };

  return (
    <ProviderContext.Provider value={value}>
      {children}
    </ProviderContext.Provider>
  );
};

// =========================================================
// Custom Hook
// =========================================================

export const useProvider = () => {
  const context =
    useContext(ProviderContext);

  if (!context) {
    throw new Error(
      "useProvider يجب استخدامه داخل ProviderContextProvider"
    );
  }

  return context;
};

export default ProviderContext;

