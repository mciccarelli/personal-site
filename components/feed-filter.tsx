'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export const FILTERS = ['all', 'projects', 'photos'] as const;
export type Filter = (typeof FILTERS)[number];

const FilterContext = createContext<{ filter: Filter; setFilter: (f: Filter) => void }>({
	filter: 'all',
	setFilter: () => {},
});

export function FilterProvider({ children }: { children: ReactNode }) {
	const [filter, setFilter] = useState<Filter>('all');
	return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export const useFilter = () => useContext(FilterContext);
