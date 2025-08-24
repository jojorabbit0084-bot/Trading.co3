'use client';

import { useUser } from '@/utils/UserContext';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

export default function ComingSoonPage() {
  const { user } = useUser();
  const userName = user?.user_metadata?.full_name || user?.email;

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
          <Link 
            href="/" 
            className="flex items-center transition-transform hover:scale-105 duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/';
            }}
          >
            <div className="relative h-10 w-40">
              <Image 
                src="/Logo_TradingSim.png" 
                alt="TradingSim Logo"
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="cursor-pointer"
              />
            </div>
          </Link>
          
          {/* User Navigation */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Logged in as: {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-danger to-danger-600 text-white font-semibold px-4 py-2 rounded-lg hover:from-danger-600 hover:to-danger-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Coming Soon Content */}
      <main className="relative flex flex-col min-h-[calc(100vh-64px)]">
        <div className="flex-grow flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-fade-in">
            Welcome, {userName}!
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto animate-slide-up">
            Thank you for registering! We're thrilled to have you on board as one of our early members.
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up delay-100">
            Our investment dashboard is under construction, but stay tuned — exciting features and personalized insights are on the way soon!
          </p>
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg">
              <p className="text-2xl font-bold text-white mb-4">🚀 Get Ready for Something Amazing! 🚀</p>
              <p className="text-gray-300">We're working hard to bring you the best trading experience. Follow us on social media for updates!</p>
              <div className="mt-6 flex justify-center">
                <a 
                  href="https://www.instagram.com/profitvision360/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-accent-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Follow us on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-dark-900/50 border-t border-white/10 py-6 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400">
              © 2025 TradingSim. All rights reserved. 
              <a 
                href="https://www.instagram.com/profitvision360/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-accent-400 hover:text-accent-300 transition-colors"
              >
                @profitvision360
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
