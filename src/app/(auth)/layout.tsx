'use client';

import AuthFooter from '@/components/layout/AuthFooter';
import AuthHeader from '@/components/layout/AuthHeader';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <AuthHeader />
      <main className='flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md'>
          {children}
        </div>
      </main>
      <AuthFooter />
    </div>
  );
} 