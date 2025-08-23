'use client';

import { useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import { useUser } from '@/utils/UserContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Show "Coming Soon" dashboard for authenticated users
  const userName = user.user_metadata?.full_name || user.email;

  return (
    <LandingPage>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent animate-fade-in">
          Welcome, {userName}!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto animate-slide-up">
          Thank you for registering, {userName}! We’re thrilled to have you on board as one of our early members.
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up delay-100">
          Our investment dashboard is under construction, but stay tuned — exciting features and personalized insights are on the way soon!
        </p>
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-lg">
            <p className="text-2xl font-bold text-white mb-4">🚀 Get Ready for Something Amazing! 🚀</p>
            <p className="text-gray-300">We're working hard to bring you the best trading experience. Follow us on social media for updates!</p>
          </div>
        </div>
      </div>
    </LandingPage>
  );
}
