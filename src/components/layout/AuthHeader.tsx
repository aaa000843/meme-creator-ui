'use client';

import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <span className='text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200'>🎭</span>
            <span className='text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200'>Meme Creator</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 