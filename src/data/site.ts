import type { CollectionEntry } from 'astro:content';

export const site = {
  name: 'Azola Krweqe',
  title: 'Azola Krweqe — Artist & Curator',
  description:
    'The artistic and curatorial practice of Azola Krweqe: exhibition-making, moving image, writing and the everyday archive.',
  email: 'hello@azolakrweqe.co.za',
  substack: 'https://substack.com/@azolakrweqe',
  instagram: 'https://www.instagram.com/azolakrweqe',
  siteUrl: 'https://azolakrweqe.co.za',
};

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Home Affairs', href: '/home-affairs' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'writing'>;

export const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;
export const byDate = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
