'use client';

import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { getVisibleLinks, NavLink } from '@/utils/navigation';

import Button from '@/components/buttons/Button';

import { useAuth } from '@/contexts/Auth.context';

const links: NavLink[] = [
  { href: '/profile', label: 'Profile', authLevel: 'USER' },
  { href: '/edit-images', label: 'Images', authLevel: 'ADMIN' },
  { href: '/edit-vectors', label: 'Vectors', authLevel: 'ADMIN' },
  { href: '/login', label: 'Login', authLevel: 'ONLY_AUTH' },
];

export interface IHeaderProps {
  className?: string;
}

export default function Header({ className }: IHeaderProps) {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const visibleLinks = getVisibleLinks(links, isAuthenticated, user?.role);

  return (
    <header
      className={cn('bg-white border-b shadow-sm sticky top-0 z-50', className)}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <span className='text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200'>
              🎭
            </span>
            <span className='text-xl font-semibold group-hover:text-blue-600 transition-colors duration-200'>
              Meme Creator
            </span>
          </Link>

          {/* Navigation and Auth */}
          <nav className='flex items-center space-x-6'>
            <ul className='flex items-center space-x-6'>
              {visibleLinks.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className='text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200'
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <Button
                onClick={logout}
                className='px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg 
                  hover:bg-blue-600 hover:text-white active:bg-blue-700 active:border-blue-700 
                  transition-all duration-200'
              >
                Log Out
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
