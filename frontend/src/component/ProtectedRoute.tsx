import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
    requiredRole?: string;
    children: React.ReactNode;
};

const ProtectedRoute = ({ requiredRole, children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>Please wait...</p>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unAuthorized" replace />;
    }

    return <>{children}</>
}

export default ProtectedRoute;