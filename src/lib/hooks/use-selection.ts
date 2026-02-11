import { useState, useCallback } from 'react';

export function useSelection<T>(items: T[], getItemId: (item: T) => number | string) {
  const [selectedIds, setSelectedIds] = useState<Set<number | string>>(new Set());

  const toggleSelection = useCallback((id: number | string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback(() => {
    const allIds = items.map(getItemId);
    setSelectedIds(new Set(allIds));
  }, [items, getItemId]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds: Array.from(selectedIds),
    toggleSelection,
    selectAll,
    clearSelection,
    count: selectedIds.size,
    hasSelection: selectedIds.size > 0,
    isAllSelected: items.length > 0 && selectedIds.size === items.length,
  };
}
