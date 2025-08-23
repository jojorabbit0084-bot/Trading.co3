'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.push('/home');
      }
    } catch (error) {
      setMessage('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@tradingsim.co');
    setPassword('demo123');
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@tradingsim.co',
        password: 'demo123',
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.push('/');
      }
    } catch (error) {
      setMessage('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      <div className="absolute top-4 left-4">
        <Link href="/">
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
        {/* Left Panel - Marketing Content */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-600 via-primary-600 to-accent-600 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold mb-8 leading-tight">
              Welcome Back, <span className="text-accent-200">Trader!</span>
            </h2>
            <p className="text-xl mb-10 leading-relaxed text-gray-100">
              Ready to continue your journey to trading mastery? Your portfolio and progress are waiting.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center border-2 border-success/50">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Your Portfolio Awaits</h3>
                  <p className="text-gray-200">Track your virtual investments and see your progress</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center border-2 border-secondary-500/50">
                  <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
                  <p className="text-gray-200">Detailed performance insights and trading patterns</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center border-2 border-accent-500/50">
                  <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Live Market Updates</h3>
                  <p className="text-gray-200">Real-time quotes and market movement alerts</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">📈 Today's Market Insight</h4>
              <p className="text-gray-200 text-sm mb-2">
                NIFTY is showing strong bullish momentum. Perfect time to test your options strategies!
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-success">NIFTY: +1.2%</span>
                <span className="text-secondary-400">BANKNIFTY: +0.8%</span>
                <span className="text-accent-400">Volatility: Moderate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-dark-900 flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <Link href="/home" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-6 inline-block">
                TradingSim
              </Link>
              <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
              <p className="text-gray-400 text-lg">Sign in to your trading account</p>
            </div>

            {/* Demo Account Banner */}
            <div className="bg-gradient-to-r from-accent-500/20 to-accent-600/20 border border-accent-500/30 rounded-xl p-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm">Try Demo Account</h4>
                  <p className="text-gray-300 text-xs">Instant access with ₹10L virtual funds</p>
                </div>
                <button
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  Demo Login
                </button>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-xl mb-6 ${message.includes('error') || message.includes('Invalid') || message.includes('failed') ? 'bg-danger/20 border border-danger/50 text-danger-200' : 'bg-success/20 border border-success/50 text-success-200'}`}>
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

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 text-primary-600 bg-white/10 border border-white/20 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In to Dashboard'
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                  Sign up for free
                </Link>
              </p>
              <Link href="/" className="text-gray-500 hover:text-gray-400 transition-colors text-sm">
                ← Back to Home
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">Quick Stats</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-success">10K+</div>
                    <div className="text-xs text-gray-400">Active Traders</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-secondary-400">₹50Cr+</div>
                    <div className="text-xs text-gray-400">Virtual Volume</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-lg font-bold text-accent-400">24/7</div>
                    <div className="text-xs text-gray-400">Market Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
