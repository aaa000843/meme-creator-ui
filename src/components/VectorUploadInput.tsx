import React, { useRef, useState } from 'react';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

import { useVector } from '@/contexts/Vector.context';

const VectorUploadInput: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSVG, setSelectedSVG] = useState<string | null>(null);
  const [vectorName, setVectorName] = useState<string>('');
  const { uploadVector } = useVector();

  const handleSVGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedSVG(reader.result as string);
      };
      reader.readAsText(file); // Read as text for SVG files
    }
  };

  const handleUpload = async () => {
    if (selectedSVG && vectorName) {
      try {
        await uploadVector({ svg: selectedSVG, name: vectorName });
        setSelectedSVG(null);
        setVectorName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSVGStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedSVG(e.target.value);
  };

  return (
    <div className='flex flex-col items-center'>
      <input
        type='text'
        placeholder='Enter vector name...'
        value={vectorName}
        onChange={(e) => setVectorName(e.target.value)}
        className='mt-4 p-2 border rounded'
      />
      <label className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
        <input
          ref={fileInputRef}
          type='file'
          accept='.svg'
          className='hidden'
          onChange={handleSVGChange}
        />
        Upload SVG from Device
      </label>
      <textarea
        className='mt-4 p-2 border rounded'
        placeholder='Paste your SVG string here...'
        value={selectedSVG || ''}
        onChange={handleSVGStringChange}
      />
      <div className='flex justify-between mt-2'>
        <Button onClick={handleUpload} disabled={!selectedSVG}>
          Upload SVG
        </Button>
      </div>
      {selectedSVG && (
        <div className='mt-4'>
          <NextImage
            src={`data:image/svg+xml;utf8,${encodeURIComponent(selectedSVG)}`}
            alt={`Uploaded SVG - ${vectorName}`}
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default VectorUploadInput;
