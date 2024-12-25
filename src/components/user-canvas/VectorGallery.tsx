import * as fabric from 'fabric';
import React, { useEffect } from 'react';

import { convertSVGToDataURL } from '@/lib/helper';

import NextImage from '@/components/NextImage';

import { useCanvasContext } from '@/contexts/Canvas.context';
import { useVector } from '@/contexts/Vector.context';

const VectorGallery: React.FC = () => {
  const { state } = useCanvasContext();
  const { vectors, fetchVectors } = useVector();

  const addVectorToCanvas = async (svgString: string) => {
    const objs = await fabric.loadSVGFromString(svgString);
    const obj = fabric.util.groupSVGElements(objs.objects as fabric.Object[]);

    obj.set({ left: 10, top: 10 }).scaleToHeight(50);

    state.canvas?.add(obj);
    state.canvas?.renderAll();
  };

  useEffect(() => {
    fetchVectors();

    return () => {
      fetchVectors();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Vector Gallery</h2>
      <div className='grid grid-cols-8 gap-4'>
        {vectors.map((vector, index) => (
          <NextImage
            useSkeleton
            key={vector._id}
            src={convertSVGToDataURL(vector.svg)}
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
