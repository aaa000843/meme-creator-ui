import React, { useEffect, useState } from 'react';

import IconButton from '@/components/buttons/IconButton';
import { IconMap } from '@/components/icons/Icon';
import NextImage from '@/components/NextImage';
import PopoverModal from '@/components/PopoverModal';
import { TagCloud } from '@/components/TagCloud';

import { usePicture } from '@/contexts/Picture.context';
import { useTag } from '@/contexts/Tag.context';

const ImageGalleryCarousel: React.FC = () => {
  const { pictures, fetchPictures, deletePicture, updatePicture } =
    usePicture();
  const [page, setPage] = useState(1);
  // const [pageSize, _] = useState(10);

  const { tags, createTag } = useTag();

  useEffect(() => {
    fetchPictures();

    return () => {
      fetchPictures();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <div className='flex justify-between'>
              <PopoverModal
                trigger={<IconButton icon={IconMap.tag} />}
                className={{ modal: 'w-[500px] p-2' }}
              >
                <TagCloud
                  tags={tags ?? []}
                  tagItems={image.tags || []}
                  onCreateNewTag={(name) => createTag({ name })}
                  onAddTag={(tagSlug) =>
                    updatePicture(image._id, {
                      tags: [...(image.tags || []), tagSlug],
                    })
                  }
                  onRemoveTag={(tagSlug) =>
                    updatePicture(image._id, {
                      tags: (image.tags || []).filter((tag) => tag !== tagSlug),
                    })
                  }
                />
              </PopoverModal>
              <IconButton
                title='delete'
                icon={IconMap['delete']}
                variant='outline'
                onClick={() => handleDeleteImage(image._id)}
              />
            </div>
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
