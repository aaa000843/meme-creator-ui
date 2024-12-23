'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';

import { useAuth } from '@/contexts/Auth.context';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <main>
      <Header />
      <section className='layout relative min-h-screen'>
        <div>
          <h1 className='text-3xl font-bold mb-8'>Profile</h1>

          <div className='bg-white shadow rounded-lg p-6'>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Name
                </label>
                <div className='mt-1 text-lg'>{user.name}</div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Email
                </label>
                <div className='mt-1 text-lg'>{user.email}</div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Role
                </label>
                <div className='mt-1 text-lg capitalize'>
                  {user.role?.toLowerCase() || 'User'}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-600'>
                  Member Since
                </label>
                <div className='mt-1 text-lg'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// Add auth protection to the page
export default function ProtectedProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}
