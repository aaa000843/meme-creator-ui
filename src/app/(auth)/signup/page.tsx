'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { requestErrorMessage } from '@/lib/axios/request';

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
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Signup</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignupPage;
