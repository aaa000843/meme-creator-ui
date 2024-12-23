'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';

import Button from '@/components/buttons/Button';

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
      router.push('/login');
    } catch (err) {
      setError('Failed to update password');
    }
  };

  return (
    <div>
      <div className='border border-gray-700 rounded-lg p-2 w-fit mx-auto mt-[5rem]'>
        <h1 className='mb-2'>Update Password</h1>
        <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type='submit'>Update Password</Button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

const UpdatePasswordPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdatePasswordForm />
    </Suspense>
  );
};

export default UpdatePasswordPage;
