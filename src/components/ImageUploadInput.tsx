import React, { useState } from 'react';

import NextImage from '@/components/NextImage';

import { usePicture } from '@/contexts/Picture.context';

const ImageUploadInput: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadPicture } = usePicture();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelSelection = () => {
    setSelectedImage(null);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadPicture(selectedFile);
        cancelSelection();
      } catch (err) {
        console.error(err);
      }
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
        <div>
          <div className='mt-4'>
            <NextImage
              width={360}
              height={360}
              src={selectedImage}
              alt='Selected'
              className='max-w-[200px] w-[200px] border rounded-lg'
            />
            <button onClick={handleUpload} disabled={!selectedFile}>
              COnfirm Upload
            </button>
            <button onClick={cancelSelection}>Not now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
