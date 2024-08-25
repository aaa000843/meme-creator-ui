import React, { createContext, ReactNode, useContext, useState } from 'react';

import { request } from '@/lib/axios/request';

import { Picture } from '@/models/pictures';

interface PictureContextType {
  pictures: Picture[];
  uploadPicture: (file: File) => Promise<void>;
  fetchPictures: () => Promise<void>;
}

const PictureContext = createContext<PictureContextType | undefined>(undefined);

export const PictureProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [pictures, setPictures] = useState<Picture[]>([]);

  const uploadPicture = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await request<Picture>('/pictures/upload', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setPictures((prev) => [...prev, response]);
  };

  const fetchPictures = async () => {
    const response = await request<Picture[]>('/design-assets', {
      method: 'GET',
    });
    setPictures(response);
  };

  return (
    <PictureContext.Provider value={{ pictures, uploadPicture, fetchPictures }}>
      {children}
    </PictureContext.Provider>
  );
};

export const usePicture = (): PictureContextType => {
  const context = useContext(PictureContext);
  if (!context) {
    throw new Error('usePicture must be used within a PictureProvider');
  }
  return context;
};
