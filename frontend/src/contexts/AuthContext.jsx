import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user;

    const login = async (credentials) => {
        try {
            const res = await axiosInstance.post('/auth/login', credentials);
            setUser(res.data);
            return true;
        } catch (error) {
            console.log("error in login method", error.response?.data?.message || error.message);
            return false;
        }
    }

    const register = async (credentials) => {
        const res = await axiosInstance.post('/auth/signup', credentials);
        setUser(res.data);
    }

    const logout = async () => {
        try {
            await axiosInstance.get('/auth/logout');
            setUser(null);  
        } catch (error) {
            alert("error loggin out");
        }
    }

    const checkAuth = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/auth/checkAuth');
            setUser(res.data);  
        } catch (error) {
            console.log("user not authenticated", error.response?.data?.message || error.message);
            setUser(null);
        } finally{
            setLoading(false);
        }
    }
    
    return (
        <AuthContext.Provider value = {{user, checkAuth, logout, login, register, isAuthenticated, loading}}>
            {children}
        </AuthContext.Provider>
    )
    
}

const useAuth = () => useContext(AuthContext);
export {useAuth}