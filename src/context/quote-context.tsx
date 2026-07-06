'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type QuoteContextValue = {
  selectedIds: number[];
  isSelected: (id: number) => boolean;
  toggle: (id: number) => void;
  add: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  count: number;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

const STORAGE_KEY = 'spe-quote-list';

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSelectedIds(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds, hydrated]);

  const value = useMemo<QuoteContextValue>(
    () => ({
      selectedIds,
      isSelected: (id) => selectedIds.includes(id),
      toggle: (id) =>
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      add: (id) => setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
      remove: (id) => setSelectedIds((prev) => prev.filter((x) => x !== id)),
      clear: () => setSelectedIds([]),
      count: selectedIds.length,
    }),
    [selectedIds]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within a QuoteProvider');
  return ctx;
}
