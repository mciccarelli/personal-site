'use client';

import { type ReactNode } from 'react';
import { useFilter } from '@/components/feed-filter';

// the word "photos" in the about copy — toggles the photo feed easter egg
export default function PhotosToggle({ children }: { children: ReactNode }) {
  const { photosVisible, setPhotosVisible } = useFilter();
  return (
    <button
      type="button"
      aria-pressed={photosVisible}
      onClick={() => setPhotosVisible(!photosVisible)}
      className="text-foreground/90 hover:text-foreground hover:decoration-red-500 cursor-pointer no-underline underline-offset-2 transition-colors hover:underline"
    >
      {children}
    </button>
  );
}
