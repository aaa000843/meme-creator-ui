import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

import { Tag } from '@/models/tags';

interface UseTagCloudProps {
  tags: Tag[];
  onSearch?: (query: string, filteredTags: Tag[]) => void;
  onAddTag?: (tagName: string) => void;
  onRemoveTag?: (tagId: string) => void;
}

export const useTagCloud = ({
  tags,
  onSearch,
  onAddTag,
  onRemoveTag,
}: UseTagCloudProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const lowercaseQuery = query.toLowerCase();
      const filteredTags = tags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(lowercaseQuery) ||
          tag.slug.toLowerCase().includes(lowercaseQuery),
      );
      onSearch?.(query, filteredTags);
    },
    [onSearch, tags],
  );

  const handleAddTag = useCallback(
    (tagSlug: string) => {
      onAddTag?.(tagSlug);
    },
    [onAddTag],
  );

  const debouncedHandleAddTag = useMemo(
    () => debounce(handleAddTag, 300),
    [handleAddTag],
  );

  const handleRemoveTag = useCallback(
    (tagId: string) => {
      onRemoveTag?.(tagId);
    },
    [onRemoveTag],
  );

  const debouncedHandleRemoveTag = useMemo(
    () => debounce(handleRemoveTag, 300),
    [handleRemoveTag],
  );

  return {
    searchQuery,
    newTagName,
    showAddTag,
    setSearchQuery: handleSearch,
    setNewTagName,
    setShowAddTag,
    handleAddTag: debouncedHandleAddTag,
    handleRemoveTag: debouncedHandleRemoveTag,
  };
};
