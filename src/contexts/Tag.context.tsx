import React, { createContext, ReactNode, useContext, useState } from 'react';

import { RequestError } from '@/lib/axios/@types';
import { request, requestErrorMessage } from '@/lib/axios/request';

import { Tag } from '@/models/tags';

interface TagContextType {
  tags: Tag[];
  createTag: (tag: Omit<Tag, '_id'>) => Promise<void>;
  updateTag: (id: string, updatedTag: Partial<Tag>) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  getTags: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

interface TagProviderProps {
  children: ReactNode;
}

export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTag = async (tag: Omit<Tag, '_id'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await request<Tag>('/tags', {
        method: 'POST',
        data: tag,
      });
      const newTag = response;
      setTags((prevTags) => [...prevTags, newTag]);
    } catch (err) {
      setError(requestErrorMessage(err as RequestError));
    } finally {
      setIsLoading(false);
    }
  };

  const updateTag = async (
    id: string,
    updatedTag: Partial<Tag>,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await request<Tag>(`/tags/${id}`, {
        method: 'PUT',
        data: updatedTag,
      });
      const updated = response;
      setTags((prevTags) =>
        prevTags.map((tag) => (tag._id === id ? updated : tag)),
      );
    } catch (err) {
      setError(requestErrorMessage(err as RequestError));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTag = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await request<Tag>(`/tags/${id}`, { method: 'DELETE' });
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (err) {
      setError(requestErrorMessage(err as RequestError));
    } finally {
      setIsLoading(false);
    }
  };

  const getTags = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await request<Tag[]>('/tags', { method: 'GET' });
      const fetchedTags = response;
      setTags(fetchedTags);
    } catch (err) {
      setError(requestErrorMessage(err as RequestError));
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    tags,
    createTag,
    updateTag,
    deleteTag,
    getTags,
    isLoading,
    error,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

// Create a custom hook for using the context
export const useTag = () => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTag must be used within a TagProvider');
  }
  return context;
};
