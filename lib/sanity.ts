import { createClient } from 'next-sanity';
import { type FeedItem } from '@/components/feed';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-01',
  useCdn: true,
});

const FEED_QUERY = `*[_type in ["project", "photoSet"]]{
  _type, title, role, url, description, technologies, date,
  "image": image.asset->url,
  "video": video.asset->url,
  "images": images[]{
    caption,
    camera,
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

interface FeedDoc {
  _type: 'project' | 'photoSet';
  title: string;
  role: string | null;
  url: string | null;
  description: string | null;
  technologies: string | null;
  image: string | null;
  video: string | null;
  date: string;
  images:
    | { src: string; width: number; height: number; caption: string | null; camera: string | null }[]
    | null;
}

export async function getFeed(): Promise<FeedItem[]> {
  const docs = await client.fetch<FeedDoc[]>(FEED_QUERY);
  return docs.flatMap<FeedItem>((doc) => {
    const date = doc.date.slice(0, 7);
    if (doc._type === 'photoSet') {
      const images = doc.images ?? [];
      // the pile layout needs at least one image; hide sets until photos are uploaded
      if (images.length === 0) return [];
      return [{ type: 'photo', title: doc.title, date, images }];
    }
    return [
      {
        type: 'project',
        title: doc.title,
        date,
        description: doc.description ?? '',
        role: doc.role ?? undefined,
        url: doc.url ?? undefined,
        technologies: doc.technologies ?? undefined,
        image: doc.image ?? undefined,
        video: doc.video ?? undefined,
      },
    ];
  });
}
