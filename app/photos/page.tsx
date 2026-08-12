import Home from '@/components/home';

export const revalidate = 60;

export default function PhotosPage() {
  return <Home photosVisible />;
}
