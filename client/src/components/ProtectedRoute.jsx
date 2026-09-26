import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const {
    user,
    loading,
    pendingApproval,
  } = useAuth();

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (pendingApproval) {
    return <Navigate to="/pending-approval" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;