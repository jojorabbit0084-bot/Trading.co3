'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getAbsoluteURL } from '@/utils/url';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Get the current site URL
      const siteUrl = window.location.origin;
      const resetPageUrl = `${siteUrl}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetPageUrl
      });

      if (error) {
        setMessage(error.message);
        setIsSuccess(false);
      } else {
        setMessage('Password reset instructions have been sent to your email address.');
        setIsSuccess(true);
      }
    } catch (error) {
      setMessage('An error occurred while sending the reset email');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <div className="absolute top-4 left-4">
        <Link href="/home">
          <Image
            src="/Logo_TradingSim.png"
            alt="TradingSim Logo"
            width={180}
            height={40}
            priority
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex min-h-screen">
        {/* Left Panel - Help & Security Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-600 via-primary-600 to-secondary-600 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold mb-8 leading-tight">
              <span className="text-accent-200">Secure</span> Account Recovery
            </h2>
            <p className="text-xl mb-10 leading-relaxed text-gray-100">
              Don't worry! Happens to the best of us. We'll help you regain access to your trading account quickly and securely.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center border-2 border-success/50">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email-Based Reset</h3>
                  <p className="text-gray-200">Secure password reset via email verification</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center border-2 border-secondary-500/50">
                  <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Bank-Level Security</h3>
                  <p className="text-gray-200">Your account data is encrypted and protected</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center border-2 border-accent-500/50">
                  <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Recovery</h3>
                  <p className="text-gray-200">Get back to trading within minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">🔐 Security Tips</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li className="flex items-start space-x-2">
                  <span className="text-success">•</span>
                  <span>Check your email (including spam folder)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-secondary-400">•</span>
                  <span>Reset link expires in 24 hours</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-400">•</span>
                  <span>Use a strong, unique password</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary-400">•</span>
                  <span>Enable 2FA for extra security</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel - Reset Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-dark-900 flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-6 inline-block">
                TradingSim
              </Link>
              <h1 className="text-4xl font-bold text-white mb-3">Reset Password</h1>
              <p className="text-gray-400 text-lg">Enter your email to receive reset instructions</p>
            </div>

            {!isSuccess ? (
              <>
                {message && !isSuccess && (
                  <div className="p-4 rounded-xl mb-6 bg-danger/20 border border-danger/50 text-danger-200">
                    <p className="text-sm">{message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      placeholder="Enter your email address"
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
                        <span>Sending Reset Email...</span>
                      </div>
                    ) : (
                      'Send Reset Instructions'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-success/50">
                  <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
                <div className="bg-success/20 border border-success/50 rounded-xl p-6 mb-6">
                  <p className="text-success-200 text-sm leading-relaxed">{message}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 mb-8">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">What's Next?</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>1. Check your email inbox for reset instructions</p>
                    <p>2. Click the secure reset link (expires in 24 hours)</p>
                    <p>3. Create a new strong password</p>
                    <p>4. Sign back in and continue trading</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setMessage('');
                    setEmail('');
                  }}
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors text-sm"
                >
                  Try different email address
                </button>
              </div>
            )}

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-400">
                Remember your password?{' '}
                <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                  Sign in here
                </Link>
              </p>
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-secondary-400 hover:text-secondary-300 font-semibold transition-colors">
                  Sign up for free
                </Link>
              </p>
              <Link href="/" className="text-gray-500 hover:text-gray-400 transition-colors text-sm block">
                ← Back to Home
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">Need Help?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors group">
                    <svg className="w-5 h-5 text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-xs text-gray-400">FAQ</div>
                  </a>
                  <a href="#" className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors group">
                    <svg className="w-5 h-5 text-secondary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="text-xs text-gray-400">Support</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
