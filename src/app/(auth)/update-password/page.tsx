'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

import Button from '@/components/buttons/Button';
import TextLink from '@/components/links/TextLink';

import { useAuth } from '@/contexts/Auth.context';

const UpdatePasswordForm: React.FC = () => {
  const { updatePassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid token');
      return;
    }
    try {
      await updatePassword(token as string, newPassword);
      setMessage('Password updated successfully');
      setError('');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError('Failed to update password');
      setMessage('');
    }
  };

  return (
    <div className='bg-white shadow-xl rounded-2xl p-8 space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Set new password</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Please enter your new password
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            New Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Enter your new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg 
              text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-colors duration-200'
          />
        </div>

        {message && (
          <div className='text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3'>
            {message}
          </div>
        )}

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
          Update password
        </Button>
      </form>

      <div className='flex justify-center space-x-4'>
        <TextLink 
          href='/login'
          className='text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          Back to sign in
        </TextLink>
        <TextLink 
          href='/signup'
          className='text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          Create an account
        </TextLink>
      </div>
    </div>
  );
};

const UpdatePasswordPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    }>
      <UpdatePasswordForm />
    </Suspense>
  );
};

export default UpdatePasswordPage;
