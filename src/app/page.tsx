'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import LandingPage from '@/components/LandingPage';
import Sidebar from '@/components/Sidebar';
import { PortfolioChart, AllocationChart } from '@/components/Charts';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase.auth]);

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

  // Show dashboard for authenticated users
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-primary-700 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-primary-500">
            <h2 className="text-lg font-semibold text-gray-700">Portfolio Total Value</h2>
            <p className="text-3xl font-bold text-primary-700 mt-2">₹10,25,678.90</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-success">
            <h2 className="text-lg font-semibold text-gray-700">Today's Gain/Loss</h2>
            <p className="text-3xl font-bold text-success mt-2">+₹1,23,456</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-accent-500">
            <h2 className="text-lg font-semibold text-gray-700">Top Performing Stock</h2>
            <p className="text-3xl font-bold text-primary-700 mt-2">TCS</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Growth</h2>
            <PortfolioChart />
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Asset Allocation</h2>
            <AllocationChart />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            <li className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border-l-4 border-primary-500">
              <span className="font-semibold text-success">Bought</span> 10 shares of TCS at ₹3,500 on 2025-08-12
            </li>
            <li className="p-4 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-lg border-l-4 border-danger">
              <span className="font-semibold text-danger">Sold</span> 5 shares of RELIANCE at ₹2,900 on 2025-08-11
            </li>
            <li className="p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border-l-4 border-primary-500">
              <span className="font-semibold text-success">Bought</span> 15 shares of INFY at ₹1,550 on 2025-08-10
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
