import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-08-01',
  useCdn: false,
});

export interface WorkItem {
  kind: 'client' | 'experiment';
  title: string;
  // year and month, e.g. 2026-10
  date: string;
  role?: string;
  url?: string;
  description: string;
  technologies?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  video?: string;
}

export interface PhotoSet {
  title: string;
  date: string;
  images: { src: string; width: number; height: number }[];
}

// client work and experiments in one list, newest first; kind is the only thing that tells them apart
const WORK_QUERY = `*[_type in ["project", "experiment"]] | order(date desc) {
  _type, title, role, url, description, technologies, date,
  "image": image.asset->url,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
  "video": video.asset->url
}`;

interface WorkDoc {
  _type: 'project' | 'experiment';
  title: string;
  role: string | null;
  url: string | null;
  description: string | null;
  technologies: string | null;
  image: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  video: string | null;
  date: string;
}

export async function getWork(): Promise<WorkItem[]> {
  const docs = await client.fetch<WorkDoc[]>(WORK_QUERY);
  return docs.map((doc) => ({
    kind: doc._type === 'experiment' ? 'experiment' : 'client',
    title: doc.title,
    date: doc.date.slice(0, 7),
    description: doc.description ?? '',
    role: doc.role ?? undefined,
    url: doc.url ?? undefined,
    technologies: doc.technologies ?? undefined,
    image: doc.image ?? undefined,
    imageWidth: doc.imageWidth ?? undefined,
    imageHeight: doc.imageHeight ?? undefined,
    video: doc.video ?? undefined,
  }));
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
