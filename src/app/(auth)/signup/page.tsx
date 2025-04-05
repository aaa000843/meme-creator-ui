'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { requestErrorMessage } from '@/lib/axios/request';

import Button from '@/components/buttons/Button';
import TextLink from '@/components/links/TextLink';

import { useAuth } from '@/contexts/Auth.context';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, name, password);
      router.push('/');
    } catch (err) {
      let errorMessage = '';
      if (err instanceof AxiosError) {
        errorMessage = requestErrorMessage(err) ?? '';
      }
      setError(errorMessage ?? 'Failed to sign up');
    }
  };

  return (
    <div className='bg-white shadow-xl rounded-2xl p-8 space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Create your account</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Join us and start creating amazing memes
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
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            id='name'
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder='Create a password'
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
          Create account
        </Button>
      </form>

      <div className='text-center'>
        <TextLink 
          href='/login'
          className='text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          Already have an account? Sign in
        </TextLink>
      </div>
    </div>
  );
};

export default SignupPage;
