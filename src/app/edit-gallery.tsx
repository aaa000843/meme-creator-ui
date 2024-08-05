import React from 'react';

import ImageGalleryCarousel from '@/components/ImageGalleryCarousel';
import ImageUpload from '@/components/ImageUploadForm';
import RecentUploads from '@/components/RecentUploadView';
import TagManagement from '@/components/TagManagement';

const EditGallery: React.FC = () => {
  return (
    <div>
      <h1>Edit Gallery</h1>
      <ImageUpload />
      <ImageGalleryCarousel />
      <TagManagement />
      <RecentUploads />
    </div>
  );
};

export default EditGallery;
