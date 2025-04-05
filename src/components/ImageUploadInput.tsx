import React, { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

import { usePicture } from '@/contexts/Picture.context';

const ImageUploadInput: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadPicture(selectedFile);
        cancelSelection();
      } catch (err) {
        // TODO: Remove this once we have a proper error handling, by adding a toast
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <label
        className={cn(
          'cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600',
          { ['disabled:bg-blue-300 opacity-25']: selectedFile },
        )}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
          disabled={!!selectedFile}
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

            <div className='flex justify-between mt-2'>
              <Button onClick={handleUpload} disabled={!selectedFile}>
                Confirm
              </Button>
              <Button onClick={cancelSelection}>Not now</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
