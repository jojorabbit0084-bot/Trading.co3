'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Sidebar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'My Investments', href: '/investments' },
    { name: 'Transaction History', href: '/transactions' },
    { name: 'Profile & Settings', href: '/profile' },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
      <h2 className="text-3xl font-semibold text-navy">Trading Co.</h2>
      <div className="flex flex-col justify-between mt-6 flex-grow">
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-2 mt-5 text-gray-700 rounded-md hover:bg-gray-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-5 font-medium text-white bg-navy rounded-md hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
