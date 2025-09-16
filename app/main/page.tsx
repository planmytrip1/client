'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();
  
  // Redirect to the homepage
  useEffect(() => {
    router.push('/');
  }, [router]);

  // This will show briefly during redirect
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
    </div>
  );
}