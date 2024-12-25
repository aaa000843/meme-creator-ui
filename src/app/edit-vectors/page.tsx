'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TagManagement from '@/components/TagManagement';
import VectorCarousel from '@/components/VectorCarousel';
import VectorUploadInput from '@/components/VectorUploadInput';

const EditVector: React.FC = () => {
  return (
    <div>
      <h1>Edit Vectors</h1>
      <div
        className={cn(
          'border-2 border-dashed border-gray-500 rounded-md',
          'p-4 max-w-fit',
        )}
      >
        <VectorUploadInput />
      </div>

      <VectorCarousel />
      <TagManagement />
    </div>
  );
};

export default function ProtectedEditVectorPage() {
  return (
    <ProtectedRoute requiredRole='ADMIN'>
      <EditVector />
    </ProtectedRoute>
  );
}
