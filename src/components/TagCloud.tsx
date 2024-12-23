import { useTagCloud } from '@/hooks/useTagCloud';

import { Tag } from '@/models/tags';

interface TagCloudProps {
  tags: Tag[];
  tagItems: string[];
  onSearch?: (query: string) => void;
  onAddTag?: (tagSlug: string) => void;
  onCreateNewTag?: (tagName: string) => void;
  onRemoveTag?: (tagSlug: string) => void;
  className?: string;
}

export const TagCloud: React.FC<TagCloudProps> = ({
  tags,
  tagItems = [],
  onSearch,
  onAddTag,
  onCreateNewTag,
  onRemoveTag,
  className = '',
}) => {
  const {
    searchQuery,
    newTagName,
    showAddTag,
    setSearchQuery,
    setNewTagName,
    setShowAddTag,
    handleAddTag,
    handleRemoveTag,
  } = useTagCloud({
    tags,
    onSearch,
    onAddTag,
    onRemoveTag,
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Tags Display */}
      <div className='flex flex-wrap gap-2'>
        {tags
          .filter((tag) => tagItems.some((item) => item === tag.slug))
          .map((tag) => (
            <div
              key={tag._id}
              className='flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200'
            >
              <span>{tag.name}</span>
              {onRemoveTag && (
                <button
                  onClick={() => handleRemoveTag(tag.slug)}
                  className='ml-1 text-gray-500 hover:text-red-500 focus:outline-none'
                >
                  ×
                </button>
              )}
            </div>
          ))}
      </div>
      {/* Search Bar */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search tags...'
            className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {onAddTag && (
            <button
              onClick={() => setShowAddTag(true)}
              className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Add Tag
            </button>
          )}
        </div>

        {searchQuery && (
          <div className='flex flex-col gap-1 p-2 border rounded-lg'>
            {tags
              .filter(
                (tag) =>
                  tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  tag.slug.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((tag) => (
                <div
                  key={tag._id}
                  className='flex justify-between items-center p-2 hover:bg-gray-100 rounded'
                >
                  <span>{tag.name}</span>
                  {!tagItems.includes(tag.slug) && onAddTag && (
                    <button
                      onClick={() => handleAddTag(tag.slug)}
                      className='px-2 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600'
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Add Tag Input */}
      {showAddTag && onCreateNewTag && (
        <div className='flex gap-2'>
          <input
            type='text'
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder='Enter new tag name...'
            className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={() => onCreateNewTag(newTagName)}
            className='px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
          >
            Create
          </button>
          <button
            onClick={() => setShowAddTag(false)}
            className='px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
