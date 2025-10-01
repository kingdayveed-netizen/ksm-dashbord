import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logo } from '../../assets/paths';
import AuthPage from './AuthPage';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }
      try {
        await verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully. You can now log in.');
      } catch (err) {
        setStatus('error');
        setMessage(err?.message || 'Email verification failed.');
      }
    };
    run();
  }, [token, verifyEmail]);

  return (
    <AuthPage>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Email Verification</h2>
      <div className="text-center space-y-6">
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${status === 'loading' ? 'bg-blue-100' : status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
          {status === 'loading' && (
            <svg className="h-6 w-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5 9a7 7 0 0114 0M5 15a7 7 0 0014 0" />
            </svg>
          )}
          {status === 'success' && (
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status === 'error' && (
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
        </div>

        <p className="text-gray-700">{message}</p>

        <div className="space-y-3">
          <Link to="/login" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500">Go to login</Link>
        </div>
      </div>
    </AuthPage>
  );
};

export default VerifyEmailPage;


