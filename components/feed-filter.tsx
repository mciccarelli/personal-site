'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export const FILTERS = ['all', 'projects', 'photos'] as const;
export type Filter = (typeof FILTERS)[number];

const PHOTOS_STORAGE_KEY = 'ciccarelli-show-photos';

const FilterContext = createContext<{
	filter: Filter;
	setFilter: (f: Filter) => void;
	photosVisible: boolean;
	setPhotosVisible: (visible: boolean) => void;
}>({
	filter: 'all',
	setFilter: () => {},
	photosVisible: false,
	setPhotosVisible: () => {},
});

export function FilterProvider({
	children,
	initialPhotosVisible = false,
}: {
	children: ReactNode;
	initialPhotosVisible?: boolean;
}) {
	const [filter, setFilter] = useState<Filter>('all');
	const [photosVisible, setPhotosVisibleState] = useState(initialPhotosVisible);

	// /photos unlocks the easter egg for future visits; otherwise restore a previous unlock
	useEffect(() => {
		if (initialPhotosVisible) {
			localStorage.setItem(PHOTOS_STORAGE_KEY, '1');
		} else if (localStorage.getItem(PHOTOS_STORAGE_KEY) === '1') {
			setPhotosVisibleState(true);
		}
	}, [initialPhotosVisible]);

	const setPhotosVisible = (visible: boolean) => {
		setPhotosVisibleState(visible);
		localStorage.setItem(PHOTOS_STORAGE_KEY, visible ? '1' : '0');
		if (!visible) setFilter('all');
	};

	return (
		<FilterContext.Provider value={{ filter, setFilter, photosVisible, setPhotosVisible }}>
			{children}
		</FilterContext.Provider>
	);
}

export const useFilter = () => useContext(FilterContext);
