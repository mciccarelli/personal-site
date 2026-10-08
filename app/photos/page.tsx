import type { Metadata } from 'next';
import PhotoCanvas, { type CanvasSet } from '@/components/photo-canvas';
import { getFeed } from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'photos · michael ciccarelli',
  alternates: { canonical: '/photos' },
};

export default async function PhotosPage() {
  const feed = await getFeed();
  const sets: CanvasSet[] = feed.flatMap((item) =>
    item.type === 'photo'
      ? [
          {
            // the column header carries place and year; camera rides along in the lightbox
            title: item.title.split(' — ')[0].replace(/\s+(19|20)\d{2}$/, ''),
            fullTitle: item.title,
            year: item.date.slice(0, 4),
            images: item.images.map(({ src, width, height }) => ({ src, width, height })),
          },
        ]
      : [],
  );

  return <PhotoCanvas sets={sets} />;
}
