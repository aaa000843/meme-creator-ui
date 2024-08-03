import React, { useState } from 'react';

import { useCanvasContext } from '@/contexts/Canvas.context';

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { state } = useCanvasContext();
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(1);

  const handleExport = () => {
    if (!state.canvas) return;

    let dataUrl = '';
    if (format === 'jpg') {
      dataUrl = state.canvas.toDataURL({
        format: 'jpeg',
        quality,
        multiplier: 1,
      });
    } else if (format === 'svg') {
      dataUrl = state.canvas.toSVG();
    } else {
      dataUrl = state.canvas.toDataURL({ format: 'png', multiplier: 1 });
    }

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `design.${format}`;
    link.click();

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded shadow-md'>
        <h2 className='text-lg font-bold mb-4'>Export Design</h2>
        <div className='mb-4'>
          <label className='block mb-2'>Format:</label>
          <select
            className='w-full p-2 border'
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value='jpg'>JPG</option>
            <option value='png'>PNG</option>
            <option value='svg'>SVG</option>
          </select>
        </div>
        {format === 'jpg' && (
          <div className='mb-4'>
            <label className='block mb-2'>Quality:</label>
            <input
              type='range'
              min='0.1'
              max='1'
              step='0.1'
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
            />
          </div>
        )}
        <div className='flex justify-end'>
          <button className='mr-2 px-4 py-2 bg-gray-200' onClick={onClose}>
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-blue-600 text-white'
            onClick={handleExport}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
