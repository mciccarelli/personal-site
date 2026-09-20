'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Spinner from '@/components/spinner';

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
}

// the full-size photo: its box is laid out from the dimensions before any bytes arrive,
// a spinner sits in it, and the photo fades in on load. keyed by src so each photo starts fresh
function Photo({ src, width, height }: LightboxImage) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      className="relative flex max-h-full max-w-full items-center justify-center shadow-2xl"
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
    >
      {!loaded && (
        <span className="text-muted-foreground absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      <img
        src={src}
        width={width}
        height={height}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`bg-secondary block h-auto max-h-[calc(100dvh-3rem)] w-auto max-w-full transition-opacity duration-500 ease-out md:max-h-[calc(100dvh-4rem)] ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </motion.div>
  );
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
      <Photo key={current.src} src={current.src} width={current.width} height={current.height} />
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
