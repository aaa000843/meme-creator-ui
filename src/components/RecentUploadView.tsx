import axios from 'axios';
import React, { useEffect, useState } from 'react';

import NextImage from '@/components/NextImage';

interface Image {
  id: string;
  url: string;
}

const RecentUploads: React.FC = () => {
  const [recentImages, setRecentImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchRecentImages = async () => {
      try {
        const response = await axios.get('/api/images/recent');
        setRecentImages(response.data.images);
      } catch (error) {
        console.error('Error fetching recent images', error);
      }
    };

    fetchRecentImages();
  }, []);

  return (
    <div>
      <h2>Recent Uploads</h2>
      <div>
        {recentImages.map((image) => (
          <div key={image.id}>
            <NextImage src={image.url} alt='image' layout='fill' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUploads;
