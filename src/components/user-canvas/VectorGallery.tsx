import * as fabric from 'fabric';
import React, { useEffect } from 'react';

import NextImage from '@/components/NextImage';

import { useCanvasContext } from '@/contexts/Canvas.context';
import { useVector } from '@/contexts/Vector.context';

// eslint-disable-next-line no-useless-escape

const VectorGallery: React.FC = () => {
  const { state } = useCanvasContext();
  const { vectors, fetchVectors } = useVector();

  const addVectorToCanvas = async (svgString: string) => {
    fabric.loadSVGFromString(svgString, (objects, options) => {
      if (Array.isArray(objects) && objects.length > 0) {
        const obj = fabric.util.groupSVGElements(objects, options);
        obj.set({ left: 10, top: 10 }).setCoords();

        state.canvas?.add(obj);
        state.canvas?.renderAll();
      } else {
        console.error('No valid SVG objects found');
      }
    });
  };

  useEffect(() => {
    fetchVectors();

    return () => {
      fetchVectors();
    };
  }, []);

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Vector Gallery</h2>
      <div className='grid grid-cols-8 gap-4'>
        {vectors.map((vector, index) => (
          <NextImage
            useSkeleton
            key={index}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(vector.svg)}`} // Changed from vector.url to vector.svg
            alt={`Vector ${index + 1}: ${vector.name}`}
            width={100}
            height={100}
            className='cursor-pointer p-1 border'
            onClick={() => addVectorToCanvas(vector.svg)}
          />
        ))}
      </div>
    </div>
  );
};

export default VectorGallery;
