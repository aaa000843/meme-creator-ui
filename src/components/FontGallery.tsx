import React from 'react';

import { useCanvasContext } from '@/contexts/Canvas.context';

const fonts = [
  { name: 'Arial', family: 'Arial, sans-serif' },
  { name: 'Times New Roman', family: 'Times New Roman, serif' },
  // Add more font options
];

const FontGallery: React.FC = () => {
  const { state } = useCanvasContext();

  const applyFontToText = (fontFamily: string) => {
    const activeObject = state.canvas?.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.set('fontFamily', fontFamily);
      state.canvas?.renderAll();
    }
  };

  return (
    <div className='p-4 bg-white border-t'>
      <h2 className='text-lg font-bold mb-4'>Font Gallery</h2>
      <div className='flex flex-col'>
        {fonts.map((font, index) => (
          <div
            key={index}
            className='cursor-pointer'
            style={{ fontFamily: font.family }}
            onClick={() => applyFontToText(font.family)}
          >
            {font.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontGallery;
