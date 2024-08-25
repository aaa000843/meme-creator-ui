import React, { useState } from 'react';

import { usePicture } from '@/contexts/Picture.context';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadPicture } = usePicture();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadPicture(file);
      await alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
