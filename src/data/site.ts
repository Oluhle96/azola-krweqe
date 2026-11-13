import type { CollectionEntry } from 'astro:content';
import settings from './settings.json';

export const site = {
  ...settings,
  title: `${settings.name} — Artist & Curator`,
  siteUrl: 'https://azola-krweqe.azola-krweqe.workers.dev',
};

export const nav = [
  { label: settings.navProjects, href: '/projects' },
  { label: settings.navExhibitions, href: '/exhibitions' },
  { label: settings.navWriting, href: '/writing' },
  { label: settings.navAbout, href: '/about' },
  { label: settings.navContact, href: '/contact' },
];

export type Project = CollectionEntry<'projects'>;
export type Exhibition = CollectionEntry<'exhibitions'>;
export type Post = CollectionEntry<'writing'>;

export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) =>
  a.data.order - b.data.order;
export const byDate = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
