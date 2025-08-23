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
    if (typeof window === 'undefined') return;

    const handlePasswordReset = async () => {
      try {
        const code = searchParams.get('code');
        
        if (!code) {
          setError('Invalid reset link. Please request a new reset link.');
          return;
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          // Try to exchange the code for a session
          const { error: authError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (authError) {
            console.error('Auth error:', authError);
            setError('Invalid or expired reset link. Please request a new one.');
            setTimeout(() => {
              router.push('/forgot-password?error=Invalid or expired reset link');
            }, 3000);
            return;
          }
        }

        setError(''); // Clear any errors if we get here
      } catch (error) {
        console.error('Reset password error:', error);
        setError('An error occurred. Please try again.');
      }
    };

    handlePasswordReset();
  }, [searchParams, router, supabase.auth]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

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

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      // First ensure we have a valid session
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        setError('Your session has expired. Please request a new reset link.');
        setTimeout(() => {
          router.push('/forgot-password');
        }, 3000);
        return;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
      } else {
        setMessage('Password updated successfully!');
        setIsPasswordUpdated(true);
        
        // Sign out and redirect to login
        await supabase.auth.signOut();
        
        setTimeout(() => {
          router.push('/login?message=Password reset successful. Please login with your new password.');
        }, 2000);
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter new password"
              />
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-400">Password must contain:</p>
                <ul className="text-xs space-y-1 text-gray-400">
                  <li className={`flex items-center ${password.length >= 8 ? 'text-success' : ''}`}>
                    <span className="mr-1">{password.length >= 8 ? '✓' : '•'}</span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(password) ? 'text-success' : ''}`}>
                    <span className="mr-1">{/[A-Z]/.test(password) ? '✓' : '•'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${/[a-z]/.test(password) ? 'text-success' : ''}`}>
                    <span className="mr-1">{/[a-z]/.test(password) ? '✓' : '•'}</span>
                    One lowercase letter
                  </li>
                  <li className={`flex items-center ${/\d/.test(password) ? 'text-success' : ''}`}>
                    <span className="mr-1">{/\d/.test(password) ? '✓' : '•'}</span>
                    One number
                  </li>
                  <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-success' : ''}`}>
                    <span className="mr-1">{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '•'}</span>
                    One special character
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Confirm new password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-xs text-danger">Passwords do not match</p>
              )}
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
