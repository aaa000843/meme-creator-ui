import React, { useState } from 'react';

import NextImage from '@/components/NextImage';

const ImageUploadInput: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <label className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
        Upload Image
      </label>
      {selectedImage && (
        <div className='mt-4'>
          <NextImage
            layout='fill'
            src={selectedImage}
            alt='Selected'
            className='max-w-full h-auto border rounded-lg'
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
