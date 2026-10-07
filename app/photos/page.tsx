import { redirect } from 'next/navigation';

// photo sets are hidden for now; the route sends visitors home
export default function PhotosPage() {
  redirect('/');
}
