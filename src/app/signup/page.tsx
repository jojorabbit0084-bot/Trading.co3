'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const getStrengthText = (strength: number) => {
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return levels[strength] || 'Very Weak';
  };

  const getStrengthColor = (strength: number) => {
    const colors = ['text-danger', 'text-accent-600', 'text-accent-500', 'text-secondary-500', 'text-success'];
    return colors[strength] || 'text-danger';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setMessage('Please agree to the terms and conditions');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setMessage('Please choose a stronger password');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Registration successful! Please check your email to activate your account.');
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
        setAgreedToTerms(false);
        setPasswordStrength(0);
      }
    } catch (error) {
      setMessage('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    setIsLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) {
        setMessage(error.message);
      } else {
        router.replace('/home');
      }
    } catch (error) {
      setMessage('An error occurred during Google One Tap signup');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Expose handleGoogleSignIn to the window object for Google One Tap callback
    (window as any).handleGoogleSignIn = handleGoogleSignIn;
  }, []);

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
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 p-12 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-extrabold mb-8 leading-tight">
              Join the <span className="text-accent-200">Elite 5%</span> of Successful Traders
            </h2>
            <p className="text-xl mb-10 leading-relaxed text-gray-100">
              While 95% of traders lose money, our users consistently profit. Master the markets with professional-grade tools and risk-free practice.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center border-2 border-success/50">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">₹10 Lakh Virtual Capital</h3>
                  <p className="text-gray-200">Start with substantial virtual funds to practice like a pro</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-full flex items-center justify-center border-2 border-secondary-500/50">
                  <svg className="w-6 h-6 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Real-Time Market Data</h3>
                  <p className="text-gray-200">Live NSE quotes and authentic market volatility</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center border-2 border-accent-500/50">
                  <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Advanced Analytics</h3>
                  <p className="text-gray-200">Deep insights and performance tracking tools</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  AS
                </div>
                <div>
                  <p className="text-white font-medium mb-2">"This platform saved me from losing ₹3 lakhs. I practiced my options strategies here first and discovered all my mistakes before going live with real money."</p>
                  <p className="text-gray-300 text-sm">— Arjun Sharma, Options Trader from Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Signup Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-dark-900 flex items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-6 inline-block">
                TradingSim
              </Link>
              <h1 className="text-4xl font-bold text-white mb-3">Create Your Account</h1>
              <p className="text-gray-400 text-lg">Start your risk-free trading journey in 60 seconds</p>
            </div>

            {message && (
              <div className={`p-4 rounded-xl mb-6 ${
                message.includes('error') || message.includes('match') || message.includes('stronger') || message.includes('agree') 
                  ? 'bg-danger/20 border border-danger/50 text-danger-200' 
                  : 'bg-success/20 border border-success/50 text-[#98FB98]'
              }`}>
                <p className={`text-sm ${
                  message.includes('error') || message.includes('match') || message.includes('stronger') || message.includes('agree')
                    ? 'text-danger-200'
                    : 'text-[#98FB98]'
                }`}>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <button
                type="button"
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
              >
                <Image src="/google.svg" alt="Google Logo" width={24} height={24} className="mr-3" />
                Sign Up Using Google
              </button>

              <div className="relative flex items-center justify-center my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-dark-900 px-4 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

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
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Create a strong password"
                />
                {password && (
                  <div className="mt-3">
                    <div className="flex space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                            i < passwordStrength ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-sm font-medium ${getStrengthColor(passwordStrength)}`}>
                      Password strength: {getStrengthText(passwordStrength)}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  placeholder="Confirm your password"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-danger text-sm mt-2">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary-600 bg-white/10 border border-white/20 rounded focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-300 leading-6">
                  I agree to the{' '}
                  <a href="#" className="text-primary-400 hover:text-primary-300 underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-400 hover:text-primary-300 underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg py-4 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Creating Your Account...</span>
                  </div>
                ) : (
                  'Start Trading Risk-Free Now'
                )}
              </button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                  Sign in here
                </Link>
              </p>
              <Link href="/" className="text-gray-500 hover:text-gray-400 transition-colors text-sm">
                ← Back to Home
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                  <span>Instant Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
