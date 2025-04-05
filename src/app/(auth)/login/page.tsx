'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import TextLink from '@/components/links/TextLink';

import { useAuth } from '@/contexts/Auth.context';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div className='bg-white shadow-xl rounded-2xl p-8 space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Welcome back</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Please sign in to your account
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg 
              text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-colors duration-200'
          />
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg 
              text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-colors duration-200'
          />
        </div>

        {error && (
          <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3'>
            {error}
          </div>
        )}

        <Button
          type='submit'
          className='w-full py-2.5 text-base font-semibold shadow-sm hover:shadow
            bg-blue-600 text-white hover:bg-blue-700 rounded-lg
            transition-all duration-200'
        >
          Sign in
        </Button>
      </form>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <TextLink 
            href='/signup'
            className='text-sm font-medium text-blue-600 hover:text-blue-700'
          >
            Create an account
          </TextLink>
          <TextLink 
            href='/forgot-password'
            className='text-sm font-medium text-blue-600 hover:text-blue-700'
          >
            Forgot password?
          </TextLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
