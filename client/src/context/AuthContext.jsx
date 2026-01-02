import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';



const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

const AuthContext = createContext(initialState);



const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            axios.defaults.headers.common['x-auth-token'] = localStorage.token;
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            dispatch({
                type: 'USER_LOADED',
                payload: res.data,
            });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData, config);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: res.data,
            });
            loadUser();
            toast.success('Registration successful!');
        } catch (err) {
            dispatch({
                type: 'REGISTER_FAIL',
                payload: err.response?.data?.msg || 'Registration failed',
            });
            toast.error(err.response?.data?.msg || 'Registration failed');
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            console.log('Attempting login...');
            const res = await axios.post('http://localhost:5000/api/auth/login', formData, config);
            console.log('Login response:', res.data);

            // Set token immediately
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data,
            });

            await loadUser();
            toast.success('Logged in successfully!');
        } catch (err) {
            console.error('Login error:', err);
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['x-auth-token'];

            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response?.data?.msg || 'Login failed',
            });
            toast.error(err.response?.data?.msg || 'Invalid Credentials');
        }
    };

    // Logout
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        toast.success('Logged out');

    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                register,
                login,
                logout,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
