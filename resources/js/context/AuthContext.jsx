import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const res = await axios.get('/user');
                setUser(res.data);
            }
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post('/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (data) => {
        const res = await axios.post('/register', data);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        try {
            await axios.post('/logout');
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
