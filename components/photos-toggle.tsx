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
      className="text-foreground/85 hover:text-foreground cursor-pointer no-underline underline-offset-[0.2em] transition-colors hover:underline"
    >
      {children}
    </button>
  );
}
