import * as fabric from 'fabric';
import React from 'react';

import NextImage from '@/components/NextImage';

import { useCanvasContext } from '@/contexts/Canvas.context';

const images = [
  'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // Add more image URLs
];

const ImageGallery: React.FC = () => {
  const { state } = useCanvasContext();

  const addImageToCanvas = async (url: string) => {
    const image = await fabric.FabricImage.fromURL(url, {
      crossOrigin: 'anonymous',
    });
    state.canvas?.add(image);
    state.canvas?.renderAll();
  };

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Image Gallery</h2>
      <div className='grid grid-cols-3 gap-4'>
        {images.map((url, index) => (
          <NextImage
            useSkeleton
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            width={100}
            height={100}
            className='cursor-pointer'
            onClick={() => addImageToCanvas(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
