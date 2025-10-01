import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';

// Auth Pages
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import VerifyEmailPage from './components/auth/VerifyEmailPage';

// Main Pages
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordForm />
                </PublicRoute>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <PublicRoute>
                  <ResetPasswordForm />
                </PublicRoute>
              }
            />
            <Route
              path="/verify-email/:token"
              element={
                <PublicRoute>
                  <VerifyEmailPage />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Role-specific placeholders */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRoles={['Super Admin']}>
                  <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Super Admin Panel</h1>
                        <p className="mt-2 text-gray-600">Manage the entire KSM system</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/metro/*"
              element={
                <ProtectedRoute requiredRoles={['Metro']}>
                  <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Metro Dashboard</h1>
                        <p className="mt-2 text-gray-600">Metropolitan Council Management</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/sub-council/*"
              element={
                <ProtectedRoute requiredRoles={['Sub Council']}>
                  <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Sub Council Dashboard</h1>
                        <p className="mt-2 text-gray-600">Subordinate Council Management</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/zone/*"
              element={
                <ProtectedRoute requiredRoles={['Zone']}>
                  <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">Zonal Dashboard</h1>
                        <p className="mt-2 text-gray-600">Zone Management and Data Sharing</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/*"
              element={
                <ProtectedRoute requiredRoles={['User']}>
                  <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                      <div className="px-4 py-6 sm:px-0">
                        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
                        <p className="mt-2 text-gray-600">Access all available features</p>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Utility */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

