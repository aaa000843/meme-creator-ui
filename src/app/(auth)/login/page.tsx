'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';

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
    <div>
      <div className='border border-gray-700 rounded-lg p-2 w-fit mx-auto mt-[5rem]'>
        <h1 className='mb-2'>Login</h1>
        <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type='submit'>Login</Button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
