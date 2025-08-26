'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, ReactNode } from 'react';
import { useUser } from '@/utils/UserContext';
import { createClient } from '@/utils/supabase/client';
import TestimonialSlider from './TestimonialSlider';
import { UserPlus, Wallet, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  children?: ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero'); // Default to hero section
  const { user } = useUser();
  
  const userName = user?.user_metadata?.full_name || user?.email;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Adjust as needed
    );

    const sections = ['hero', 'features', 'how-it-works', 'testimonials', 'final-cta'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId); // Update active section immediately on click
    } else {
      // If section not found on current page, redirect to landing page with section hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Logo with Glossy Shine */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image 
                src="/Logo_TradingSim.png" 
                alt="TradingSim Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className={`text-gray-300 hover:text-white transition-colors ${activeSection === 'features' ? 'glow' : ''}`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className={`text-gray-300 hover:text-white transition-colors ${activeSection === 'how-it-works' ? 'glow' : ''}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className={`text-gray-300 hover:text-white transition-colors ${activeSection === 'testimonials' ? 'glow' : ''}`}
            >
              Reviews
            </button>
            {!user && (
              <>
                <Link href="/login" className={`text-gray-300 hover:text-white transition-colors ${activeSection === 'login' ? 'glow' : ''}`}>Login</Link>
                <Link href="/signup" className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
                  REGISTER
                </Link>
              </>
            )}
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Welcome, {userName}</span>
                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
                <button
                  onClick={async () => {
                    const supabase = createClient();
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}
                  className="bg-gradient-to-r from-danger to-danger-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-danger-600 hover:to-danger-700 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-white/20">
            <div className="px-6 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </button>
              {!user && (
                <>
                  <Link href="/login" className="block text-gray-300 hover:text-white transition-colors">Login</Link>
                  <Link href="/signup" className="block bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-2.5 rounded-lg text-center">
                    Start Trading Free
                  </Link>
                  <Link href="/signup" className="block bg-gradient-to-r from-accent-500 to-danger text-white font-semibold px-6 py-2.5 rounded-lg text-center">
                    REGISTER
                  </Link>
                </>
              )}
              {user && (
                <>
                  <span className="block text-gray-300">Logged in as: {userName}</span>
                  <Link href="/profile" className="block text-gray-300 hover:text-white transition-colors">Edit Profile</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {children ? (
        <main className="relative">
          {children}
        </main>
      ) : (
        <main className="relative overflow-hidden">
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 animate-gradient-flow" style={{ backgroundSize: '200% 200%' }}></div>
          </div>

          <section id="hero" className="relative z-10 container mx-auto px-6 py-20 md:py-32 text-center">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                Stop Losing Money. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-white">
                  Master Options Trading Like a Pro.
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                95% of retail traders lose money. Don't be a statistic. Practice your strategies with 
                <span className="text-accent-400 font-semibold"> ₹10 Lakhs virtual funds</span> and 
                <span className="text-secondary-400 font-semibold"> real-time Option Chain data</span>—completely risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-subtle glow"
                >
                  Pre-register for Free ₹10L Demo Account
                </Link>
                <Link 
                  href="/login" 
                  className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Already Trading? Login
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-300">No credit card required. Start trading in 60 seconds.</p>

              {/* Social Proof / Micro Stats */}
              <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-lg">Trusted by <span className="font-semibold text-white">5,000+</span> Indian traders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  <span className="text-lg">Simulating <span className="font-semibold text-white">₹50Cr+</span> in trades daily</span>
                </div>
              </div>

              {/* Secondary Visual */}
              {/* Removed as per user request */}
            </div>
          </section>
        </main>
      )}

      {/* Mini-highlight strip (value props) */}
      {!children && (
        <section className="relative z-10 bg-white/5 backdrop-blur-md border-y border-white/10 py-8">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-around items-center text-center md:text-left space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-lg font-semibold text-white">Real-time NSE Data</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m-1-9V3a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1v-5m-1-9h-1V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4h10z"></path></svg>
              <span className="text-lg font-semibold text-white">₹10L Virtual Funds</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <span className="text-lg font-semibold text-white">Strategy Backtesting</span>
            </div>
          </div>
        </section>
      )}

      {!children && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-px my-16"></div>
      )}

      {/* Features Section */}
      {!children && (
        <motion.section
          id="features"
          className="py-20 bg-gradient-radial from-gray-900 via-black to-gray-950"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The Ultimate <span className="text-accent-400">F&O Trading Playground</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to build confidence, test strategies, and sharpen your trading edge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Market Data</h3>
                <p className="text-gray-300">Trade with real-time NSE quotes. Experience authentic market volatility and price action without risking a single rupee.</p>
              </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-success to-accent-500 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">₹10 Lakh Risk-Free Capital</h3>
              <p className="text-gray-300">Start with virtual funds. Learn from mistakes, perfect your entries, and manage positions like a professional trader.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-secondary-500 to-primary-600 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Strategy Testing</h3>
                <p className="text-gray-300">From simple calls/puts to complex spreads, straddles, and iron condors. Test everything before deploying real capital.</p>
              </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-accent-500 to-danger p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
              <p className="text-gray-300">Track performance with detailed P&L reports. Understand win ratios, identify patterns, and optimize your trading approach.</p>
            </motion.div>
          </div>
        </div>
        </motion.section>
      )}

      {!children && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-px my-16"></div>
      )}

      {/* How It Works Section */}
      {!children && (
        <motion.section
          id="how-it-works"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Start Trading in <span className="text-secondary-400">60 Seconds</span>
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              {/* Step 1 */}
              <motion.div
                className="text-center max-w-xs animate-slide-up bg-white/5 border border-white/10 p-8 rounded-xl hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <UserPlus className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Create Free Account</h3>
                <p className="text-gray-300">Quick signup with just your email. No credit card, no hidden fees, no commitments.</p>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div
                className="text-center max-w-xs animate-slide-up bg-white/5 border border-white/10 p-8 rounded-xl hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Wallet className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get ₹10L Virtual Funds</h3>
                <p className="text-gray-300">Your account is instantly loaded with virtual capital to start trading immediately.</p>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div
                className="text-center max-w-xs animate-slide-up bg-white/5 border border-white/10 p-8 rounded-xl hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-gradient-to-r from-accent-500 to-danger text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Trade Like a Pro</h3>
                <p className="text-gray-300">Place trades, manage risk, and build confidence with real market data—risk-free.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {!children && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-px my-16"></div>
      )}

      {/* Testimonials Section */}
      {!children && (
        <motion.section
          id="testimonials"
          className="py-20 bg-gradient-radial from-gray-900 via-black to-gray-950"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <TestimonialSlider />
        </motion.section>
      )}

      {!children && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-px my-16"></div>
      )}

      {/* Secondary proof element before footer */}
      {!children && (
        <motion.section
          className="py-20 bg-gradient-radial from-gray-900 via-black to-gray-950 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Accent Gradient Lines/Shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 opacity-10 rounded-full mix-blend-lighten filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500 opacity-10 rounded-full mix-blend-lighten filter blur-3xl animate-pulse-slow delay-200"></div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-12">Why Choose <span className="text-accent-400">TradingSim</span>?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Value Prop 1 */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-4 rounded-full w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.205 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.795 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.795 5 16.5 5c1.705 0 3.332.477 4.5 1.253v13C19.832 18.477 18.205 18 16.5 18s-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Risk-Free Learning</h4>
                <p className="text-gray-300">Practice with virtual funds and real-time data without losing real money.</p>
              </motion.div>

              {/* Value Prop 2 */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-secondary-500 to-accent-500 p-4 rounded-full w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Master Your Strategy</h4>
                <p className="text-gray-300">Test and refine complex F&O strategies in a simulated environment.</p>
              </motion.div>

              {/* Value Prop 3 */}
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:translate-y-1 hover:shadow-xl flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-gradient-to-br from-accent-500 to-danger p-4 rounded-full w-20 h-20 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Data-Driven Decisions</h4>
                <p className="text-gray-300">Utilize deep analytics to understand your performance and optimize for success.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {!children && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-px my-16"></div>
      )}

      {/* Final CTA Section */}
      {!children && (
        <motion.section
          id="final-cta"
          className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 animate-background-flow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-accent-400">Transform</span> Your Trading?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Stop paying the market to learn. Build unshakeable confidence, test winning strategies, 
                and master the art of trading—completely risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg glow"
                >
                  Claim Your Free ₹10L Demo Now
                </Link>
                <Link 
                  href="/login" 
                  className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Existing User? Login
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-300">
                Join 10,000+ traders who are already practicing risk-free. No credit card required.
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
                TradingSim
              </h3>
              <p className="text-gray-300 max-w-md">
                The ultimate risk-free trading platform for Indian markets. Master F&O trading 
                with virtual funds and real-time data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trading Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 TradingSim. All rights reserved. 
              <span className="block sm:inline sm:ml-2 text-sm">
                Virtual trading platform for educational purposes only.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
