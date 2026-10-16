import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-01',
  useCdn: false,
});

export interface PhotoSet {
  title: string;
  date: string;
  images: { src: string; width: number; height: number }[];
}

// newest first on the full date; the month-level date the page shows would tie within a month
const PHOTOS_QUERY = `*[_type == "photoSet"] | order(date desc) {
  title, date,
  "images": images[]{
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

export async function getPhotoSets(): Promise<PhotoSet[]> {
  const docs = await client.fetch<(Omit<PhotoSet, 'images'> & { images: PhotoSet['images'] | null })[]>(
    PHOTOS_QUERY,
  );
  // a set with no uploads yet has nothing to place on the canvas
  return docs.flatMap((doc) =>
    doc.images?.length ? [{ title: doc.title, date: doc.date.slice(0, 7), images: doc.images }] : [],
  );
}
