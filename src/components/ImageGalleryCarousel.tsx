import React, { useEffect, useState } from 'react';

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
    <div>
      <div>
        {pictures.map((image) => (
          <div key={image._id}>
            <NextImage src={image.url} width={100} height={100} alt='Image' />
            <div>
              {/* {image.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))} */}
            </div>
            <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
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
