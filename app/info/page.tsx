import { redirect } from 'next/navigation';

// everything the info page held now lives on the home page
export default function InfoPage() {
  redirect('/');
}
