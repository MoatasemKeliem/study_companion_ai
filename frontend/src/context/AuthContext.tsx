import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../tools/utils";
import { useNavigate } from "react-router-dom";

type User = {
    id: number;
    email: string;
    role: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    hasRole: (role: string) => boolean;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${URL}/auth/profile`, {
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const hasRole = (role: string) => user?.role === role;

    const logout = async () => {
        try {
            await axios.post(`${URL}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            navigate("/login");
            location.reload()
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, hasRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
