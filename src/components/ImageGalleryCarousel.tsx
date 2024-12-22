import React, { useEffect, useState } from 'react';

import IconButton from '@/components/buttons/IconButton';
import { IconMap } from '@/components/icons/Icon';
import NextImage from '@/components/NextImage';

import { usePicture } from '@/contexts/Picture.context';

const ImageGalleryCarousel: React.FC = () => {
  const { pictures, fetchPictures, deletePicture } = usePicture();
  const [page, setPage] = useState(1);
  const [pageSize, _] = useState(10);

  useEffect(() => {
    fetchPictures();

    return () => {
      fetchPictures();
    };
  }, []);

  const handleDeleteImage = async (id: string) => {
    deletePicture(id);
  };

  return (
    <div className='p-2'>
      <div className='flex gap-2'>
        {pictures.map((image) => (
          <div
            className='p-2 border border-gray-700 rounded-md'
            key={image._id}
          >
            <NextImage
              src={image.url}
              width={100}
              height={100}
              className='w-[6rem]'
              alt='Image'
            />
            <div>
              {/* {image.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))} */}
            </div>
            <IconButton
              title='delete'
              icon={IconMap['delete']}
              variant='outline'
              onClick={() => handleDeleteImage(image._id)}
            />
          </div>
        ))}
      </div>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default ImageGalleryCarousel;
