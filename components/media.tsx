'use client';

import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/spinner';
import { useMediaState } from '@/components/media-state';

type Props = {
  src: string;
  video?: boolean;
  width?: number;
  height?: number;
  alt?: string;
  eager?: boolean;
  className?: string;
};

// holds the media's box from the first paint, shows a spinner while the bytes arrive,
// then fades the image or video in. reports to the column so its header can show progress.
export default function Media({ src, video = false, width, height, alt = '', eager = false, className = '' }: Props) {
  const ref = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const state = useMediaState();
  const counted = useRef(false);

  const finish = () => {
    setLoaded(true);
    if (counted.current) {
      counted.current = false;
      state?.done();
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // already in cache
    if (video ? el.readyState >= 2 : el.complete && el.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    // lazy media only starts loading near the viewport; count it from that moment
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !counted.current && !loaded) {
          counted.current = true;
          state?.add();
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (counted.current) {
        counted.current = false;
        state?.done();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aspect = width && height ? `${width} / ${height}` : '16 / 9';
  const fade = `block h-auto w-full transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`;

  return (
    <span className={`bg-secondary relative block w-full overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      {!loaded && (
        <span className="text-muted-foreground absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}
      {video ? (
        <video
          ref={ref}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'metadata'}
          onLoadedData={finish}
          className={`${fade} absolute inset-0 h-full object-cover`}
        />
      ) : (
        <img
          ref={ref}
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={finish}
          onError={finish}
          className={`${fade} absolute inset-0 h-full object-cover`}
        />
      )}
    </span>
  );
}
