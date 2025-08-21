'use client';

import Link from 'next/link';
import { useState, ReactNode } from 'react';

interface LandingPageProps {
  children?: ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand Logo with Glossy Shine */}
    <Link 
  href="#" 
  className="relative text-3xl font-extrabold bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent overflow-hidden animate-shine-text antialiased subpixel-antialiased"
>
  TradingSim
</Link>          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Reviews</a>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
              Start Trading Free
            </Link>
            <Link href="/signup" className="bg-gradient-to-r from-accent-500 to-danger text-white font-semibold px-6 py-2.5 rounded-lg hover:from-accent-600 hover:to-danger-600 transition-all duration-300 transform hover:scale-105">
              REGISTER
            </Link>
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
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">Reviews</a>
              <Link href="/login" className="block text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/signup" className="block bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold px-6 py-2.5 rounded-lg text-center">
                Start Trading Free
              </Link>
              <Link href="/signup" className="block bg-gradient-to-r from-accent-500 to-danger text-white font-semibold px-6 py-2.5 rounded-lg text-center">
                REGISTER
              </Link>
            </div>
          </div>
        )}
      </header>

      {children ? (
        <main className="relative">
          {children}
        </main>
      ) : (
        <main className="relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
          <section className="relative container mx-auto px-6 py-20 md:py-32 text-center">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                Stop Losing Money. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
                  
                </span>Master Options Trading Like a Pro.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                95% of retail traders lose money. Don't be a statistic. Practice your strategies with 
                <span className="text-accent-400 font-semibold"> ₹10 Lakhs virtual funds</span> and 
                <span className="text-secondary-400 font-semibold"> real-time Option Chain data</span>—completely risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce-subtle"
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
              <p className="mt-4 text-sm text-gray-400">No credit card required. Start trading in 60 seconds.</p>
            </div>
          </section>
        </main>
      )}

      {/* Features Section */}
      {!children && (
        <section id="features" className="py-20 bg-dark-800/50">
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
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Option chain Data</h3>
                <p className="text-gray-300">Trade with real-time NSE quotes. Experience authentic market volatility and price action without risking a single rupee.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-success to-accent-500 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">₹10 Lakh Risk-Free Capital</h3>
                <p className="text-gray-300">Start with virtual funds. Learn from mistakes, perfect your entries, and manage positions like a professional trader.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-secondary-500 to-primary-600 p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Advanced Strategy Testing</h3>
                <p className="text-gray-300">From simple calls/puts to complex spreads, straddles, and iron condors. Test everything before deploying real capital.</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-accent-500 to-danger p-3 rounded-full w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
                <p className="text-gray-300">Track performance with detailed P&L reports. Understand win ratios, identify patterns, and optimize your trading approach.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {!children && (
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Start Trading in <span className="text-secondary-400">60 Seconds</span>
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              {/* Step 1 */}
              <div className="text-center max-w-xs animate-slide-up">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Create Free Account</h3>
                <p className="text-gray-300">Quick signup with just your email. No credit card, no hidden fees, no commitments.</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center max-w-xs animate-slide-up">
                <div className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Get ₹10L Virtual Funds</h3>
                <p className="text-gray-300">Your account is instantly loaded with virtual capital to start trading immediately.</p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center max-w-xs animate-slide-up">
                <div className="bg-gradient-to-r from-accent-500 to-danger text-white text-2xl font-bold w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Trade Like a Pro</h3>
                <p className="text-gray-300">Place trades, manage risk, and build confidence with real market data—risk-free.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {!children && (
        <section id="testimonials" className="py-20 bg-dark-800/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What <span className="text-accent-400">Traders</span> Are Saying
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"This platform saved me from losing my real money. I tested my options strategies here first and discovered my mistakes before going live."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center font-bold text-white mr-4">
                    AS
                  </div>
                  <div>
                    <p className="font-bold text-white">Arjun Sharma</p>
                    <p className="text-sm text-gray-400">Options Trader, Mumbai</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"Finally, a demo platform focused on Indian markets! The real-time data makes practice feel authentic. My confidence has skyrocketed."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 flex items-center justify-center font-bold text-white mr-4">
                    PV
                  </div>
                  <div>
                    <p className="font-bold text-white">Priya Verma</p>
                    <p className="text-sm text-gray-400">Day Trader, Delhi</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"Clean interface, fast execution, and detailed analytics. This is exactly what I needed to perfect my swing trading strategies."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-500 to-primary-600 flex items-center justify-center font-bold text-white mr-4">
                    RK
                  </div>
                  <div>
                    <p className="font-bold text-white">Rohit Kumar</p>
                    <p className="text-sm text-gray-400">Software Engineer, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      {!children && (
        <section className="py-20">
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
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg px-8 py-4 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              <p className="mt-6 text-sm text-gray-400">
                Join 10,000+ traders who are already practicing risk-free. No credit card required.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-4">
                TradeMaster
              </h3>
              <p className="text-gray-400 max-w-md">
                The ultimate risk-free trading platform for Indian markets. Master F&O trading 
                with virtual funds and real-time data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trading Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 TradeMaster. All rights reserved. 
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
