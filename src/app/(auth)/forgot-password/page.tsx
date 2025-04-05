'use client';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import TextLink from '@/components/links/TextLink';

import { useAuth } from '@/contexts/Auth.context';

const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('Password reset email sent');
      setError('');
    } catch (err) {
      setError('Failed to send password reset email');
      setMessage('');
    }
  };

  return (
    <div className='bg-white shadow-xl rounded-2xl p-8 space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Reset your password</h1>
        <p className='mt-2 text-sm text-gray-600'>
          Enter your email and we'll send you instructions to reset your password
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
          Send reset instructions
        </Button>
      </form>

      <div className='text-center'>
        <TextLink 
          href='/login'
          className='text-sm font-medium text-blue-600 hover:text-blue-700'
        >
          Back to sign in
        </TextLink>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
