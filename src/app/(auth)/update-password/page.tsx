'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useAuth } from '@/contexts/Auth.context';

const UpdatePasswordPage: React.FC = () => {
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
      router.push('/login');
    } catch (err) {
      setError('Failed to update password');
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type='submit'>Update Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdatePasswordPage;
