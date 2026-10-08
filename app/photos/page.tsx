import type { Metadata } from 'next';
import PhotoCanvas, { type CanvasSet } from '@/components/photo-canvas';
import { getPhotoSets } from '@/lib/sanity';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'photos · michael ciccarelli',
  alternates: { canonical: '/photos' },
};

export default async function PhotosPage() {
  const sets: CanvasSet[] = (await getPhotoSets()).map((set) => ({
    // the column header carries place and year; camera rides along in the lightbox
    title: set.title.split(' — ')[0].replace(/\s+(19|20)\d{2}$/, ''),
    fullTitle: set.title,
    year: set.date.slice(0, 4),
    images: set.images,
  }));

  return <PhotoCanvas sets={sets} />;
}
