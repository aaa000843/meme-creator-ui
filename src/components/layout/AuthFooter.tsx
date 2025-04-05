'use client';

import Link from 'next/link';

export default function AuthFooter() {
  return (
    <footer className='mt-auto py-8 bg-white border-t'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-2'>
            <Link href='/' className='flex items-center space-x-2 group'>
              <span className='text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200'>
                🎭
              </span>
              <span className='text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200'>
                Meme Creator
              </span>
            </Link>
          </div>
          <nav className='flex space-x-6 text-sm text-gray-600'>
            <Link
              href='/about'
              className='hover:text-blue-600 transition-colors'
            >
              About
            </Link>
            <Link
              href='/privacy'
              className='hover:text-blue-600 transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='hover:text-blue-600 transition-colors'
            >
              Terms
            </Link>
          </nav>
          <p className='text-sm text-gray-500'>
            © {new Date().getFullYear()} Meme Creator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
