'use client';
import * as fabric from 'fabric';
import React, { useEffect, useRef } from 'react';

import { useCanvasContext } from '@/contexts/Canvas.context';

const DesignCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { dispatch } = useCanvasContext();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 600,
      width: 800,
      backgroundColor: 'white',
    });

    canvasRef.current?.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Prevent common screenshot keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key === 'p') ||
        (e.metaKey && e.key === 'p')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    dispatch({ type: 'SET_CANVAS', canvas });

    // Clean up on unmount
    return () => {
      canvas.dispose();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className='border border-gray-600'>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DesignCanvas;
