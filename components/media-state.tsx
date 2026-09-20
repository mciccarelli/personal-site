'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Spinner from '@/components/spinner';

// how many pieces of media in a column are still on their way
const MediaContext = createContext<{ pending: number; add: () => void; done: () => void } | null>(null);

export function MediaProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(0);
  const add = useCallback(() => setPending((n) => n + 1), []);
  const done = useCallback(() => setPending((n) => Math.max(0, n - 1)), []);
  const value = useMemo(() => ({ pending, add, done }), [pending, add, done]);
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMediaState() {
  return useContext(MediaContext);
}

// the column header's count: a spinner while its media loads, the number once it has
export function ColumnCount({ count }: { count: number }) {
  const state = useMediaState();
  if (state && state.pending > 0) return <Spinner className="text-muted-foreground" />;
  return <span className="text-muted-foreground">{count}</span>;
}
