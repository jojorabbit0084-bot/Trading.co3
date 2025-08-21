'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      // Supabase automatically handles session from URL tokens
      // No explicit session setting needed here, just ensure the client is initialized
    } else {
      setError('Invalid or missing tokens for password reset.');
    }
  }, [searchParams]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Your password has been updated successfully! You can now log in with your new password.');
        setIsPasswordUpdated(true);
        // Optionally redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login?message=Password reset successfully. Please log in.');
        }, 3000);
      }
    } catch (err: any) {
      setError('An unexpected error occurred: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-dark-900 p-8 rounded-xl shadow-lg border border-white/20">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-6 inline-block">
            TradeMaster
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Set New Password</h1>
          <p className="text-gray-400">Enter your new password below.</p>
        </div>

        {message && (
          <div className="p-4 rounded-xl mb-6 bg-success/20 border border-success/50 text-success-200">
            <p className="text-sm">{message}</p>
          </div>
        )}
        {error && (
          <div className="p-4 rounded-xl mb-6 bg-danger/20 border border-danger/50 text-danger-200">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isPasswordUpdated && (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">New Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Confirm new password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Resetting Password...</span>
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        {isPasswordUpdated && (
          <div className="mt-8 text-center">
            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Go to Login
            </Link>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-400 transition-colors text-sm block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
