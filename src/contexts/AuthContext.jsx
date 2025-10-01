import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService';
import apiService from '../services/api';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext(undefined);

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false, error: action.payload };
    case 'AUTH_LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false, error: null };
    case 'AUTH_CLEAR_ERROR':
      return { ...state, error: null };
    case 'AUTH_UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          dispatch({ type: 'AUTH_START' });
          const user = await authService.getCurrentUser();
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
        } catch (error) {
          dispatch({ type: 'AUTH_FAILURE', payload: 'Session expired. Please login again.' });
          apiService.removeAuthToken();
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: response.user, token: response.token } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error?.response?.data?.message || 'Login failed. Please try again.' });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: response.user, token: response.token } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error?.response?.data?.message || 'Registration failed. Please try again.' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const forgotPassword = async (email) => {
    await authService.forgotPassword(email);
  };

  const resetPassword = async (token, newPassword) => {
    await authService.resetPassword(token, newPassword);
  };

  const verifyEmail = async (token) => {
    await authService.verifyEmail(token);
  };

  const resendVerificationEmail = async (email) => {
    await authService.resendVerificationEmail(email);
  };

  const changePassword = async (currentPassword, newPassword) => {
    await authService.changePassword(currentPassword, newPassword);
  };

  const updateProfile = async (userData) => {
    const updatedUser = await authService.updateProfile(userData);
    dispatch({ type: 'AUTH_UPDATE_USER', payload: updatedUser });
  };

  const clearError = () => dispatch({ type: 'AUTH_CLEAR_ERROR' });

  const hasPermission = (permission) => {
    if (!state.user) return false;
    return (state.user.permissions || []).some((p) => p.name === permission);
  };

  const hasRole = (role) => {
    if (!state.user) return false;
    return state.user.role?.name === role;
  };

  const hasAnyRole = (roles) => {
    if (!state.user) return false;
    return roles.includes(state.user.role?.name);
  };

  const contextValue = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    changePassword,
    updateProfile,
    clearError,
    hasPermission,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


