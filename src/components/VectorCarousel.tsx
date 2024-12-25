import React, { useEffect, useState } from 'react';

import { convertSVGToDataURL } from '@/lib/helper';

import IconButton from '@/components/buttons/IconButton';
import { IconMap } from '@/components/icons/Icon';
import NextImage from '@/components/NextImage';
import PopoverModal from '@/components/PopoverModal';
import { TagCloud } from '@/components/TagCloud';

import { useTag } from '@/contexts/Tag.context';
import { useVector } from '@/contexts/Vector.context';

const VectorCarousel: React.FC = () => {
  const { vectors, fetchVectors, deleteVector, updateVector } = useVector();
  const [page, setPage] = useState(1);
  const { tags, createTag } = useTag();

  useEffect(() => {
    fetchVectors();

    return () => {
      fetchVectors();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteVector = async (id: string) => {
    deleteVector(id);
  };

  return (
    <div className='p-2'>
      <div className='flex gap-2'>
        {vectors.map((vector) => (
          <div
            className='p-2 border border-gray-700 rounded-md'
            key={vector._id}
          >
            <NextImage
              src={convertSVGToDataURL(vector.svg)}
              width={100}
              height={100}
              className='w-[6rem]'
              alt='Vector'
            />

            <div className='flex justify-between'>
              <PopoverModal
                trigger={<IconButton icon={IconMap.tag} />}
                className={{ modal: 'w-[500px] p-2' }}
              >
                <TagCloud
                  tags={tags ?? []}
                  tagItems={vector.tags || []}
                  onCreateNewTag={(name) => createTag({ name })}
                  onAddTag={(tagSlug) =>
                    updateVector(vector._id, {
                      tags: [...(vector.tags || []), tagSlug],
                    })
                  }
                  onRemoveTag={(tagSlug) =>
                    updateVector(vector._id, {
                      tags: (vector.tags || []).filter(
                        (tag) => tag !== tagSlug,
                      ),
                    })
                  }
                />
              </PopoverModal>
              <IconButton
                title='delete'
                icon={IconMap['delete']}
                variant='outline'
                onClick={() => handleDeleteVector(vector._id)}
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

export default VectorCarousel;
