'use client';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';

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
    } catch (err) {
      setError('Failed to send password reset email');
    }
  };

  return (
    <div>
      <div className='border border-gray-700 rounded-lg p-2 w-fit mx-auto mt-[5rem]'>
        <h1 className='mb-2'>Forgot Password</h1>
        <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type='submit'>Send Reset Email</Button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
