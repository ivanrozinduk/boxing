import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flame, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyEmail = useAuthStore(state => state.verifyEmail);
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      })
      .catch((err) => {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Verification failed');
      });
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <Flame className="h-12 w-12 text-purple-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Rozin
          </span>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status === 'verifying' && (
              <>
                <Loader2 className="h-12 w-12 text-purple-600 mx-auto animate-spin" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Verifying your email
                </h2>
                <p className="mt-2 text-gray-600">
                  Please wait while we verify your email address...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Email verified successfully!
                </h2>
                <p className="mt-2 text-gray-600">
                  Redirecting you to sign in...
                </p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Verification failed
                </h2>
                <p className="mt-2 text-red-600">{error}</p>
                <button
                  onClick={() => navigate('/signin')}
                  className="mt-4 text-purple-600 hover:text-purple-500"
                >
                  Return to sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}