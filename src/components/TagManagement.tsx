import React, { useEffect, useState } from 'react';

import { useTag } from '@/contexts/Tag.context';
import { EditingTag } from '@/models/tags';

const TagManagement: React.FC = () => {
  const { tags, createTag, updateTag, deleteTag, getTags, isLoading, error } =
    useTag();
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState<EditingTag | null>(null);

  useEffect(() => {
    getTags();
  }, []);

  const handleCreateTag = async () => {
    if (!newTag.trim()) return;
    await createTag({ name: newTag });
  };

  const handleEditSubmit = async () => {
    if (!editingTag) return;

    await updateTag(editingTag._id, { name: editingTag.name });
  };

  const handleDeleteTag = async (id: string) => {
    await deleteTag(id);
  };

  return (
    <div className='p-4'>
      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className='border p-2 rounded'
          placeholder='New tag name'
          disabled={isLoading}
        />
        <button
          onClick={handleCreateTag}
          disabled={isLoading}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Create Tag
        </button>
      </div>

      <ul className='space-y-2'>
        {tags.map((tag) => (
          <li key={tag._id} className='flex items-center gap-2'>
            {editingTag?._id === tag._id ? (
              <>
                <input
                  type='text'
                  value={editingTag.name}
                  onChange={(e) =>
                    setEditingTag({ ...editingTag, name: e.target.value })
                  }
                  className='border p-2 rounded'
                />
                <button
                  onClick={handleEditSubmit}
                  className='bg-green-500 text-white px-4 py-2 rounded'
                  disabled={isLoading}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setEditingTag(null)}
                  className='bg-gray-500 text-white px-4 py-2 rounded'
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{tag.name}</span>
                <button
                  onClick={() => setEditingTag(tag)}
                  className='bg-yellow-500 text-white px-4 py-2 rounded'
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTag(tag._id)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                  disabled={isLoading}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {isLoading && <div className='mt-4'>Loading...</div>}
    </div>
  );
};

export default TagManagement;
