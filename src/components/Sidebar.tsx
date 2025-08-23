'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import UserStatus from './UserStatus';

export default function Sidebar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/home' },
    { name: 'My Investments', href: '/investments' },
    { name: 'Transaction History', href: '/transactions' },
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
      <Link href="/" className="flex items-center hover:opacity-80">
        <div className="relative h-10 w-40">
          <Image 
            src="/Logo_TradingSim.png" 
            alt="TradingDemos Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </Link>
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
          <UserStatus />
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
