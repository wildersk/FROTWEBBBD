import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const RoleGuard = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("Role actual:", user?.role);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
