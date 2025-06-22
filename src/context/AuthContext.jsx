import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user_id');
        return stored ? { user_id: stored } : null;
    });

    const login = (user_id, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        setUser({ user_id });
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
