'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function UserStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };

    getUser();

    // Set up realtime subscription for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setEmail(session?.user?.email ?? null);
      } else if (event === 'SIGNED_OUT') {
        setEmail(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  if (!email) return null;

  return (
    <div className="flex items-center px-4 py-2 text-sm text-gray-600">
      <span className="inline-block w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
      Logged in as: {email}
    </div>
  );
}
