import * as fabric from 'fabric';
import React, { useEffect } from 'react';

import NextImage from '@/components/NextImage';

import { useCanvasContext } from '@/contexts/Canvas.context';
import { usePicture } from '@/contexts/Picture.context';

const ImageGallery: React.FC = () => {
  const { state } = useCanvasContext();
  const { pictures, fetchPictures } = usePicture();

  const addImageToCanvas = async (url: string) => {
    const transformedUrl = `${url}?tr=w-800`;
    const image = await fabric.FabricImage.fromURL(transformedUrl, {
      crossOrigin: 'anonymous',
    });
    state.canvas?.add(image);
    state.canvas?.renderAll();
  };

  useEffect(() => {
    fetchPictures();

    return () => {
      fetchPictures();
    };
  }, []);

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Image Gallery</h2>
      <div className='grid grid-cols-8 gap-4'>
        {pictures.map((pic, index) => (
          <NextImage
            useSkeleton
            key={index}
            src={pic.url}
            alt={`Image ${index + 1}: ${pic.name}`}
            width={100}
            height={100}
            className='cursor-pointer p-1 border'
            onClick={() => addImageToCanvas(pic.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
