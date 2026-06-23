import Image from 'next/image';
import blurMap from '@/photo-blur.json';

type Photo = {
  src: string;
  width: number;
  height: number;
};

const blur = blurMap as Record<string, string>;

export default function Photos({ photos }: { photos: Photo[] }) {
  return (
    <section>
      <div className="space-y-4">
        {photos.map((photo, i) => {
          // Portrait images stay in the narrow content column; landscape images
          // break out of it, centered on the viewport.
          const isLandscape = photo.width > photo.height;
          return (
            <div
              key={photo.src}
              className={
                isLandscape
                  ? 'relative left-1/2 w-[min(64rem,92vw)] max-w-none -translate-x-1/2'
                  : 'w-full'
              }
            >
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt=""
                // First image is above the fold — load it eagerly; the rest lazy
                // in as they're scrolled toward.
                priority={i === 0}
                placeholder={blur[photo.src] ? 'blur' : 'empty'}
                blurDataURL={blur[photo.src]}
                sizes={
                  isLandscape
                    ? '(min-width: 1024px) 1024px, 92vw'
                    : '(min-width: 672px) 672px, 100vw'
                }
                className="h-auto w-full"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
