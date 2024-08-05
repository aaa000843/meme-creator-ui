import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';

interface Image {
  id: string;
  url: string;
  tags: string[];
}

const ImageGalleryCarousel: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `/api/images?page=${page}&pageSize=${pageSize}`,
        );
        setImages(response.data.images);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, [page, pageSize]);

  const handleDeleteImage = async (id: string) => {
    try {
      await axios.delete(`/api/images/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  return (
    <div>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <NextImage src={image.url} alt='Image' layout='fill' />
            <div>
              {image.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
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
