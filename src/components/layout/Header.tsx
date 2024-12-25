import * as React from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

import { useAuth } from '@/contexts/Auth.context';
import { getVisibleLinks, NavLink } from '@/utils/navigation';

const links: NavLink[] = [
  // { href: '/dashboard', label: 'Dashboard', authLevel: 'ADMIN' },
  { href: '/profile', label: 'Profile', authLevel: 'USER' },
  { href: '/edit-images', label: 'Images', authLevel: 'ADMIN' },
  { href: '/edit-vectors', label: 'Vectors', authLevel: 'ADMIN' },
  { href: '/login', label: 'Login', authLevel: 'ONLY_AUTH' },
];

export interface IHeaderProps {
  className?: string;
}
const Header: React.FC<IHeaderProps> = ({ className, ...rest }) => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const visibleLinks = getVisibleLinks(links, isAuthenticated, user?.role);

  return (
    <header
      className={cn('header sticky top-0 z-50 bg-gray-100', className)}
      {...rest}
    >
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          Meme Creator
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {visibleLinks.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  title={label}
                  className='hover:text-gray-600'
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
            {isAuthenticated ? (
              <Button title='Logout' onClick={logout}>
                Logout
              </Button>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
