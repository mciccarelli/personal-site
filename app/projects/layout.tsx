import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected work across fintech, media, e-commerce, and emerging technology. Clients include Condé Nast, Amazon, VICE, and Pentagram.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
