'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
}

export default function Lightbox({
  title,
  images,
  index,
  onClose,
  onStep,
}: {
  title: string;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const current = images[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-6 md:p-8"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <div className="bg-background/60 absolute inset-0 backdrop-blur-md" />
      <motion.img
        key={current.src}
        src={current.src}
        width={current.width}
        height={current.height}
        alt=""
        className="relative h-auto max-h-full w-auto max-w-full shadow-2xl"
        initial={{ scale: 0.97, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
      />
      <div className="text-muted-foreground absolute bottom-4 left-1/2 -translate-x-1/2 text-xs">
        {title}
        {images.length > 1 ? ` · ${index + 1}/${images.length}` : ''}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            className="text-foreground/70 hover:text-foreground absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer p-4 text-lg transition-colors"
          >
            &larr;
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            className="text-foreground/70 hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-4 text-lg transition-colors"
          >
            &rarr;
          </button>
        </>
      )}
    </motion.div>
  );
}
