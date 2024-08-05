import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Tag {
  id: string;
  name: string;
}

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('/api/tags');
        setTags(response.data.tags);
      } catch (error) {
        console.error('Error fetching tags', error);
      }
    };

    fetchTags();
  }, []);

  const handleCreateTag = async () => {
    try {
      const response = await axios.post('/api/tags', { name: newTag });
      setTags([...tags, response.data.tag]);
      setNewTag('');
    } catch (error) {
      console.error('Error creating tag', error);
    }
  };

  const handleEditTag = async (id: string, name: string) => {
    try {
      await axios.put(`/api/tags/${id}`, { name });
      setTags(tags.map((tag) => (tag.id === id ? { ...tag, name } : tag)));
    } catch (error) {
      console.error('Error editing tag', error);
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await axios.delete(`/api/tags/${id}`);
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error('Error deleting tag', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <button onClick={handleCreateTag}>Create Tag</button>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <input
              type='text'
              value={tag.name}
              onChange={(e) => handleEditTag(tag.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTag(tag.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagManagement;
