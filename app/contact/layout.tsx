import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch for consulting, project work, or collaboration. Send a message or schedule a call.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
