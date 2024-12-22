'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import ImageGalleryCarousel from '@/components/ImageGalleryCarousel';
import ImageUploadInput from '@/components/ImageUploadInput';
import RecentUploads from '@/components/RecentUploadView';
import TagManagement from '@/components/TagManagement';

const EditGallery: React.FC = () => {
  return (
    <div>
      <h1>Edit Gallery</h1>
      <div
        className={cn(
          'border-2 border-dashed border-gray-500 rounded-md',
          'p-4 max-w-fit',
        )}
      >
        <ImageUploadInput />
      </div>

      <ImageGalleryCarousel />
      <TagManagement />
      <RecentUploads />
    </div>
  );
};

export default EditGallery;
